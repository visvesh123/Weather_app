const graphql = require("graphql");
const { result } = require("lodash");
const User = require("../models/User");
const auth = require("../resolvers/auth");


const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

//Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    watchList: { type: new GraphQLList(GraphQLString) },
  }),
});

const AuthDataType = new GraphQLObjectType({
  name: "Auth",
  description: "Documentation for authentication",
  fields: () => ({
    userId: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user :{
       type : UserType,
       args : { userId : {type : GraphQLString}},
       resolve(parent ,args){
         return User.findById(args.userId)
       }
    },
    users: {
      type: new GraphQLList(UserType),
      // args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find({});
      },
    },

    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const login_result = auth.login({
          email: args.email,
          password: args.password,
        });
        return login_result;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Desc for mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const signup_result = auth.signup({
          email: args.email,
          password: args.password,
          name: args.name,
        });
        return signup_result;
      },
    },

    addWatchList: {
      type: UserType,
      args: {
        cityname: { type: GraphQLString },
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = User.findOneAndUpdate(
          { _id: args.id },
          { $push: { watchList: args.cityname } }
        );

        return user;
      },
    },

    removeWatchList: {
      type: UserType,
      args: {
        cityname: { type: GraphQLString },
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = User.findOneAndUpdate(
          { _id: args.id },
          { $pull: { watchList: args.cityname } }
        );
        return user
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
