import React from 'react'
import { ListItem, Avatar ,  } from 'react-native-elements'
import { View } from 'react-native'



const OtherDetailsList = (props)=>{
    // console.log(props.data.data.current)
const curr = props.data.data.current
    return(
<View>
  
      <ListItem key='1' bottomDivider>
       
        <ListItem.Content>
          <ListItem.Title>Humidity : {curr.humidity}                        Pressure : {curr.pressure}    </ListItem.Title>
          {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
          
        </ListItem.Content>
      </ListItem>
      <ListItem key='2' bottomDivider>
       
        <ListItem.Content>
          <ListItem.Title>Wind Speed : {curr.wind_speed}               Wind Deg: {curr.wind_deg}</ListItem.Title>
          {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
        </ListItem.Content>
      </ListItem>

      <ListItem key='3' bottomDivider>
       
       <ListItem.Content>
         <ListItem.Title>Clouds: {curr.clouds}                             Dew_point:  {curr.dew_point} </ListItem.Title>
         {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
       </ListItem.Content>
     </ListItem>

     <ListItem key='4' bottomDivider>
       
       <ListItem.Content>
         <ListItem.Title>UV Index: {curr.uvi}                      Visibility: {curr.visibility}</ListItem.Title>
         {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
       </ListItem.Content>
     </ListItem>

  
</View>
    )
}

export default OtherDetailsList;




