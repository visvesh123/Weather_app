import React , {useState} from 'react'
import { View, Text, StyleSheet , SafeAreaView , StatusBar , FlatList , ScrollView , TouchableOpacity ,ActivityIndicator } from 'react-native'
import { Card, ListItem, Button , Image} from 'react-native-elements'
import { fetchWeatherData , searchCity} from '../store/actions';
import { connect} from 'react-redux'
import axios from 'axios'
import  LinearGradient from 'react-native-linear-gradient'
import { gradient } from '../constants/Gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const WatchListCard = (props)=>{


  

if(!props.data){
    return null;
}

const handlePress = (item)=>{
   props.fetchWeatherData(item.place)
   props.searchCity(item.place)
    props.navigation.navigate('Weather')
//   console.log(item)
}

const handleRemove = (place)=>{
    console.log("handle remove " + place)
 

    axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
         query: ` mutation{
            removeWatchList(id:"60e494e6b6a5c1517008fb0f" , cityname : "${place}"){
             
            
             watchList
             id
            }
           }`
        }
       })
        .then(res => {
         console.log(JSON.stringify(res.data));
        //  props.navigation.navigate('WatchList')
        })
        .catch(err => {
         console.log(err);
        }); 

      
    }

const Item = ({ title , main ,icon , place}) => (
  <View style={{flex : 1 , alignContent : 'center', textAlign:'center' }}>
    <LinearGradient  colors={gradient[icon]} style={styles.item}>
      <Text style={styles.title}>{title} &deg;K</Text>
      <Text style={styles.title}>{main}</Text>
      <Image
  source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
  style={{ width: 80, height: 60  }}
  PlaceholderContent={<ActivityIndicator />}
  />
      {/* <Text style={styles.title}>{icon}</Text> */}
      <Text style={styles.title}>{place}</Text>
     
      {/* <Button title="Remove" onPress={()=> handleRemove(place)}/> */}
      <TouchableOpacity onPress={()=> handleRemove(place)}>
      <Icon name="remove" size={30} color="black" />
      </TouchableOpacity>
    </LinearGradient>
    </View>
  );


  const renderItem = ({ item }) => {
      return(
        <View style={{flex : 1 , alignContent : 'center' }}> 
          <TouchableOpacity  onPress= {() => handlePress(item)}>
    <Item title={item.current.temp} main={item.current.weather[0].main}
          icon = {item.current.weather[0].icon}  place={item.place}/>
        
    </TouchableOpacity>
   
    </View>
      )
  
  }


const retData = (!props.data)? null : props.data
const places = props.cities
// setList(retData)

retData.forEach(function (element ,index) {
    element.place = places[index]
  });



    return(
        <ScrollView>
        <SafeAreaView style={styles.container}>
        <FlatList
          data={retData}
          renderItem={renderItem}
          keyExtractor={item => item.current.weather[0].icon}
        />
        {/* <Text> {JSON.stringify(places)}</Text>
      <Text> {JSON.stringify(retData)}</Text>  */}

      </SafeAreaView>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // borderRadius: 6,
        //   zIndex: 1, borderBottomColor: 'transparent',
        //   borderTopColor: 'transparent'
      },
      title: {
        fontSize: 32,
        color : 'white',
      },

})
const mapSateToProps = (state) => {
    return {
        weather: state.weather,
        coordinates: state.coordinates,
        place : state.place,
        city : state.searchCity
    }
}


export default  connect(mapSateToProps , {fetchWeatherData:fetchWeatherData ,searchCity:searchCity})(WatchListCard);