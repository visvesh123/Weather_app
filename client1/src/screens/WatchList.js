import React, {useEffect ,useState} from 'react'
import { View, Text, StyleSheet , Button , StatusBar ,FlatList ,SafeAreaView, AsyncStorage} from 'react-native'
import axios from 'axios'
import WatchListCard from '../components/WatchListCard'

  


const WatchListScreen = (props) => {
  const [watchCities , setWatchCities ] = useState([])
  const [ finalData , setFinalData] = useState([])
  var data = new Array()
    useEffect(  ()=>{

    //     const  retrieveData = async () => {
    //         try {
    //           const value = await AsyncStorage.getItem('userId');
    //           if (value !== null) {
    //             console.log(value)
    //            return value
    //           }
    //         } catch (error) {
             
    //         }
    //       };
    
    // const id  =   retrieveData()


        axios({
            url: 'http://localhost:4000/graphql',
            method: 'post',
            data: {
             query: `
             {
              user(userId:"60e494e6b6a5c1517008fb0f"){
               name
               email
               watchList
              }
             }
             `
            }
           })
            .then(res => {
              console.log(JSON.stringify(res.data.data.user.watchList));
              setWatchCities(res.data.data.user.watchList)
             
             getAllUrls(res.data.data.user.watchList)
                 
            })
            .catch(err => {
             console.log(err);
            });

 
    },[])

    async function getAllUrls(cities) {
      try {
        const data =    await Promise.all(
             cities.map(
                  city => 
                  fetch(`http://localhost:4000/weather/${city}`).then((response) => response.json())
                 
                      )
                      );   
                  // console.log(JSON.stringify(data))
        setFinalData(data)
          return data
  
      } catch (error) {
          console.log(error)
  
          throw (error)
      }
  }

 

    return (
        <SafeAreaView style={styles.container}>
   
      <WatchListCard data = {finalData} cities={watchCities} navigation={props.navigation}/>
       <Button
        onPress={() => props.navigation.navigate('Search')}
        title="Search"
      />
    
    </SafeAreaView>
        
           
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
        fontSize: 30
    },
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

export default WatchListScreen