import React from 'react'
import { View, Text, StyleSheet , SafeAreaView , StatusBar , FlatList , ScrollView , TouchableOpacity ,ActivityIndicator } from 'react-native'
import { Card, ListItem, Button, Icon , Image} from 'react-native-elements'
import { fetchWeatherData , searchCity} from '../store/actions';
import { connect} from 'react-redux'


// const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'First Item',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       title: 'Second Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: 'Third Item',
//     },
//   ];
  
  const Item = ({ title , main ,icon , place}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{main}</Text>
      <Image
  source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
  style={{ width: 80, height: 60  }}
  PlaceholderContent={<ActivityIndicator />}
  />
      {/* <Text style={styles.title}>{icon}</Text> */}
      <Text style={styles.title}>{place}</Text>
    </View>
  );


const WatchListCard = (props)=>{


    
if(!props.data){
    return null;
}

const handlePress = (item)=>{
   props.fetchWeatherData(item.place)
   props.searchCity(item.place)
    props.navigation.navigate('Weather')
  console.log(item)
}
  const renderItem = ({ item }) => {
      return(
          <> 
          <TouchableOpacity  onPress= {() => handlePress(item)}>
    <Item title={item.current.temp} main={item.current.weather[0].main}
          icon = {item.current.weather[0].icon}  place={item.place}/>
    </TouchableOpacity>
    </>
      )
  
  }


const retData = (!props.data)? null : props.data
const places = props.cities

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
      },
      title: {
        fontSize: 32,
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