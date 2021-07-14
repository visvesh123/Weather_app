import React , {useState} from 'react'
import {View , FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity , ScrollView  , ActivityIndicator} from "react-native";
import { Image } from 'react-native-elements';
import moment from 'moment'
import  LinearGradient from 'react-native-linear-gradient'
import { gradient } from '../constants/Gradient';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
  <TouchableOpacity onPress={onPress} style={ [styles.item, backgroundColor] , {padding : 10  }}>
    <LinearGradient colors={gradient[item.weather[0].icon]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
    
    <Text style={styles.text}>{ moment(item.dt * 1000).format('MMMM Do YYYY, h:mm:ss a')}</Text>
    <Image
  source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
  style={{ width: 80, height: 60 }}
  PlaceholderContent={<ActivityIndicator />}
/>
    <Text>{item.temp}</Text>
    <Text>{item.weather[0].main}</Text>
    </LinearGradient>
  </TouchableOpacity>
  </> 
 
);

const Horizontal_List = (props) => {

// console.log(JSON.stringify(props.data.data.hourly[0].weather[0].icon))
  const [selectedId, setSelectedId] = useState(null);

  const hourly_data = props.data.data.hourly

  const renderItem = ({ item }) => {
    const backgroundColor =  'white';
    const color = 'white';

    return (
      <Item 
        item={item}
        
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator = {false} style={{padding : 20}}>
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal = {true}
        data={hourly_data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    


    </SafeAreaView>
    </ScrollView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    height : 150
  },
  title: {
    fontSize: 30,
  
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  text : {
    flex: 1,
       
    color : 'white'
  }
});

export default Horizontal_List;