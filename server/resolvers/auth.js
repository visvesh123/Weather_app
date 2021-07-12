const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  signup: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const user = new User({
        name : args.name,
        email: args.email,
        password: hashedPassword,
      });

      const result = await user.save();
    //   console.log(result) 
      return  result;
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "key",
      {
        expiresIn: "1h",
      }
    );
    // console.log(token)
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
