import React from 'react'
import { ListItem, Avatar , Divider } from 'react-native-elements'
import { View  ,Text ,FlatList , StyleSheet, StatusBar, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import  LinearGradient from 'react-native-linear-gradient'
import { gradient } from '../constants/Gradient';


const OtherDetailsList = (props)=>{

    // console.log(props.data.data.current)
const curr = props.data.data.current
// console.log(JSON.stringify(props.weather.data.current.weather[0].icon))



  
  
    return(

       <>
       <ScrollView showsVerticalScrollIndicator={false}>
       <View style={styles.item}>
      
      <Text style={styles.title}>Humidity : {curr.humidity}        </Text>
      <Divider orientation="horizontal" />
  <Text style={styles.title} > Pressure : {curr.pressure} </Text>  
  <Divider orientation="horizontal" />
         <Text style={styles.title}>Wind Speed : {curr.wind_speed} </Text>
         <Divider orientation="horizontal" />
         <Text style={styles.title}> Wind Deg: {curr.wind_deg} </Text>
         <Divider orientation="horizontal" />
       <Text style={styles.title}>Clouds: {curr.clouds}   </Text>
       <Divider orientation="horizontal" />
       <Text style={styles.title}>Dew_point:  {curr.dew_point} </Text>
       <Divider orientation="horizontal" />
   
        <Text style={styles.title}>UV Index: {curr.uvi} </Text>
        <Divider orientation="horizontal" />
        <Text style={styles.title}>Visibility: {curr.visibility}</Text>
        <Divider orientation="horizontal" />
    </View>
    </ScrollView>
         
      
</>
  

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 23,
    color : 'white',
    paddingTop : 5
  },
  
});


const mapSateToProps = (state) => {
  return {
      weather: state.weather,
      coordinates: state.coordinates,
      place : state.place,
      city : state.searchCity
  }
}

export default connect(mapSateToProps , {})(OtherDetailsList);




