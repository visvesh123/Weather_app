import React, {useState} from 'react'
import { View, Text, StyleSheet , Button , ScrollView ,FlatList ,TouchableOpacity} from 'react-native'
import { Input  } from 'react-native-elements';
import { fetchWeatherData ,searchCity } from '../store/actions'
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';


const SearchScreen = (props) => {

    const [ city , setCity] = useState('')
    const [cities , setCities] = useState([])

    const handleSearch = ()=>{
        console.log("Handle search")
        props.fetchWeatherData(city)
        props.searchCity(city)
        props.navigation.navigate('Weather')
    }

    const fetchCities = (city)=>{
         setCity(city)
         fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${city}&apikey=vPTgGSRDsAgsnTWpgYBQ5BLrGopgJnO4`)
         .then(item=>item.json())
         .then(cityData=>{
             setCities(cityData)
         })
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>
                SearchScreen
            </Text>
       {/* <Text>{JSON.stringify(cities)}</Text>  */}
<Input
  placeholder='Enter city or location'
  value = {city}
  onChangeText = { (city)=> fetchCities(city)}
/>
<Button
  title="Search"
  onPress = {handleSearch}
/>
            <Button onPress={() => props.navigation.goBack()} title="Cancel" />
            <FlatList
        data={cities}
        renderItem={({item})=>{
            return(
                <TouchableOpacity
                 style={{margin:2,padding:12}}
                 onPress={()=> setCity(item.LocalizedName)}
                >
                <Text>{`${item.LocalizedName}, ${item.AdministrativeArea.LocalizedName},  ${item.Country.LocalizedName}`}</Text>
                </TouchableOpacity>
            )
        }}
        keyExtractor={item=>item.name}
        />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'darkslateblue',
        fontSize: 30,
        paddingBottom : 30
    }
})

const mapSateToProps = (state) => {
    return {
        weather: state.weather,
        coordinates: state.coordinates
    }
}
export default connect(mapSateToProps, {fetchWeatherData : fetchWeatherData,
searchCity : searchCity})(SearchScreen)