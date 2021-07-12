import React , {useState ,useEffect} from 'react'
import { Alert ,View, Text, StyleSheet , Button , TextInput , AsyncStorage ,SafeAreaView , ScrollView , ActivityIndicator} from 'react-native'
import { loginDetails  ,fetchWeatherDataWithCoordinates , fetchPlaceDataWithCoordinates} from '../store/actions';

import { connect} from 'react-redux'
import AppButton from '../components/AppButton';
import axios from 'axios';
import { Image } from 'react-native-elements';




const LoginScreen = (props) => {

const [ email , setEmail] = useState('')
const [password , setPassword] = useState('')




useEffect(() => {
  const 	findCoordinates =  async() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
                // console.log(position.coords.latitude)
           
            props.fetchWeatherDataWithCoordinates(position.coords.latitude,position.coords.longitude)
            props.fetchPlaceDataWithCoordinates(position.coords.latitude,position.coords.longitude)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  const cord =  findCoordinates()

 
  

 }, [])
 



function onLogin() {
 
    axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
         query: `
         {
          login(email:"${email}",password:"${password}"){
           userId
           token
          }
         }
         `
        }
       })
        .then(res => {
         console.log(JSON.stringify(res.data));
        //  props.loginDetails(res.data.data)
         AsyncStorage.setItem('userId', res.data.data.login.userId )

         props.navigation.navigate('Weather')


        })
        .catch(err => {
         console.log(err.message);
        });
    
//   Alert.alert('Credentials', `${email} + ${password}`);


  }

  const  renWeatherItem  =  (!props.weather.data)?  null : (    
    <Text style={styles.temp}>  {props.weather.data.current.temp}&deg;K </Text>  )
  
    const  renPlaceItem  =  (!props.place.data)?  null : (    
      <Text style={styles.temp1}>  {props.place.data.results[0].formatted}</Text>  )

    const renIcon = (!props.weather.data)?(
 null
    ):(
      <Image
      source={{ uri: `https://openweathermap.org/img/wn/${props.weather.data.current.weather[0].icon}@2x.png` }}
      style={{ width: 80, height: 60  }}
      PlaceholderContent={<ActivityIndicator />}
      />
    )

   
   
    return (
      <>
      
        <SafeAreaView style={styles.window}>
        {renIcon}
             
           {/* <Text> {JSON.stringify(props.weather.data.current.weather[0].icon)}</Text>      */}
                   {renPlaceItem}
                    {renWeatherItem}
                   
                  <Text> For more details please login </Text>
                <TextInput value={email} onChangeText={(email) => setEmail( email )} style={styles.userNameBar} placeholder="Email" />
                <TextInput secureTextEntry={true}  value={password} onChangeText={(password) => setPassword(password)} style={styles.passwordBar} placeholder="Password" />
                <AppButton title="Login" color="#0c7171" onPress={onLogin} />
                <AppButton title="Sign up" color="#0c7171" onPress={()=>  props.navigation.navigate('SignUp',{place : "helo" })} />
            </SafeAreaView>
           
           

</>
    )
}

const styles = StyleSheet.create({

    text: {
        color: 'darkslateblue',
        fontSize: 30
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
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    userNameBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        height: 40,
        paddingLeft: 20,
        marginBottom: 30,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
    temp : {
      color : 'blue',
      fontSize : 60
  },
  temp1 : {
    color : 'blue',
    fontSize : 18
},
    passwordBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        marginBottom: 20,
        height: 40,
        paddingLeft: 20,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
})
const mapStateToProps = (state)=>{
    return{
      login : state.login,
      weather : state.weather,
      place : state.place
    }
  }
  

export default connect(mapStateToProps, {loginDetails
:loginDetails ,fetchWeatherDataWithCoordinates:fetchWeatherDataWithCoordinates ,
fetchPlaceDataWithCoordinates : fetchPlaceDataWithCoordinates}) (LoginScreen)