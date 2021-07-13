import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import axios from 'axios'

const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function onSignUp() {
 

    axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
         query: `mutation{
          signup(email: "${email}", name: "${username}", password : "${password}"){
           name
           id
           email
          }
         }`
        }
       })
        .then(res => {
         console.log(res.data);
        })
        .catch(err => {
         console.log(err.message);
        });

        props.navigation.navigate('Login')
  }
  return (
    <>

      <SafeAreaView style={styles.window}>
        <Text style={styles.pageHeader}>Sign Up</Text>

        <Text style={styles.labels}> Name</Text>
        <TextInput
          style={styles.userinputs}
          placeholder="Name"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />

        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={styles.userinputs}
          placeholder="Email"
          value = {email}
          onChangeText={ (email)=> setEmail(email)}
        />
        <Text style={styles.labels}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.userinputs}
          placeholder="Password"
        />
        <Text style={styles.labels}>Re-Type Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.userinputs}
          placeholder="Re-Password"
          value = {password}
          onChangeText = { (password)=> setPassword(password)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={ onSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'darkslateblue',
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  window: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    paddingBottom: 3,
  },
  userinputs: {
    width: '60%',
    height: 40,
    paddingLeft: 20,
    marginBottom: 26,
    borderWidth: 1,
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '60%',
    height: 50,
    marginTop: 35,
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#0c7171',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '200',
    letterSpacing: 3,
  },
  pageHeader: {
    color: '#0c7171',
    fontSize: 23,
    paddingBottom: 40,
    textTransform: 'uppercase',
  },
});

export default SignUpScreen;
