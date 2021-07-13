import React, {useEffect} from 'react';
import {
  Share,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchWeatherData} from '../store/actions';
import WeatherCard from '../components/WeatherCard';
import Horizontal_List from '../components/HorizontalList';
import OtherDetailsList from '../components/OtherDetailsList';
import axios from 'axios';
import {
  Card,
  ListItem,
  Divider,
  Chip,
  Image,

} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../constants/Gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

navigator.geolocation = require('@react-native-community/geolocation');

const WeatherScreen = props => {
  // useEffect(() => {
  //  props.fetchWeatherData('kakinada')

  // }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const retItem = !props.city ? null : (
    <Text style={styles.text}>{JSON.stringify(props.city.data.data)}</Text>
  );

  const renPlaceItem = !props.place.data ? null : (
    <Text style={styles.temp1}> {props.place.data.results[0].formatted}</Text>
  );

  return (
    <>
      <LinearGradient
        colors={gradient[props.weather.data.current.weather[0].icon]}
        style={styles.container}>
        {/* {console.log(JSON.stringify(props.weather.data.current.weather))} */}

        <View>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${props.weather.data.current.weather[0].icon}@2x.png`,
            }}
            style={{width: 80, height: 60}}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.text}></Text>
          {retItem}
          {/* {renPlaceItem} */}
          <Text style={styles.text_a}>
            {' '}
            {props.weather.data.current.weather[0].description}
          </Text>

          <Text style={styles.temp}>
            {' '}
            {props.weather.data.current.temp}&deg;K{' '}
          </Text>
          <Text style={styles.feels_like}>
            {' '}
            Feels like {props.weather.data.current.feels_like}&deg;K{' '}
          </Text>
        </View>

        <TouchableOpacity onPress={()=>props.navigation.navigate('WatchList')}>
        <Icon name="list" size={30} color="black" />
        </TouchableOpacity>
        {/* <Button
          onPress={() => props.navigation.navigate('WatchList')}
          title="WatchList"
        /> */}
        <WeatherCard />
        <Horizontal_List data={props.weather} />

        <OtherDetailsList data={props.weather} />

        <Chip title="Share" onPress={onShare} />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 35,
  },
  text_a: {
    color: 'white',
    fontSize: 20,
  },
  temp: {
    color: 'white',
    fontSize: 60,
  },
  feels_like: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

const mapSateToProps = state => {
  return {
    weather: state.weather,
    coordinates: state.coordinates,
    place: state.place,
    city: state.searchCity,
  };
};

export default connect(mapSateToProps, {
  fetchWeatherData: fetchWeatherData,
})(WeatherScreen);
