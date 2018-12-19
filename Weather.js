import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Location, Permissions} from 'expo';
import * as Elements from 'react-native-elements';
import Config from './Config.js';
import moment from 'moment';
import SwipeCards from './SwipeCards.js';


class Weather extends React.Component {

state = {
  errorMessage: '',
  weather: ''
}
  componentDidMount() {
    const API_KEY = Config.WEATHER_API_KEY
    getLocationAsync = async () => {
      let status = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission Denied Please allow permissions to use app'
        })
      }
      let location = await Location.getCurrentPositionAsync({})
      console.log(location)
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.coords.latitude
        }&lon=${location.coords.longitude}&units=imperial&APPID=${API_KEY}`
      );
      let weatherData = await response.json()
      console.log(weatherData)
      this.setState({
        weather: weatherData
      })
    }
    getLocationAsync()
  }

  // api.openweathermap.org/data/2.5/weather?lat=$35&lon=139&APPID=c41d9582e5affc51fc5c1c6d7d606b0a
  render() {
    let weather;
    if (this.state.weather !== ""){
      let sunrise = new Date(1000 * this.state.weather.sys.sunrise)
      let sunset = new Date(1000 * this.state.weather.sys.sunset)
      let sunriseMoment = moment(sunrise).format('h:mm')
      let sunsetMoment = moment(sunset).format('h:mm')
      weather =(
       <View>
       <Elements.Text h1>{this.state.weather.name}</Elements.Text>
       <Image style={styles.icon} source = {{
        uri: `http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`}}
        />
        <Text h3>
         Current: {Math.round(this.state.weather.main.temp)}˚
        </Text>
        <Text h4>
         High: {Math.round(this.state.weather.main.temp_max)}˚
        </Text>
        <Text h4>
         Low: {Math.round(this.state.weather.main.temp_min)}˚
        </Text>
        <Text h4>
         Humidity: {Math.round(this.state.weather.main.humidity)}
        </Text>
        <Text h4>
         Wind Speed: {Math.round(this.state.weather.wind.speed)}mph
        </Text>
        <Text h4>
         Sunrise: {sunriseMoment}
        </Text>
         <Text h4>
         Sunset: {sunsetMoment}
        </Text>
       </View>
       );
    }
    return (
      <View style={styles.container}>
        {weather}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150
  },
  ImageBackground: {
     width: Dimensions.get("window").width,
     height: Dimensions.get("window").height,
  },
});

class FiveDay extends React.Component {
state = {
  errorMessage: '',
  weather: '',

}
  componentDidMount() {
    const API_KEY = Config.WEATHER_API_KEY
    getLocationAsync = async () => {
      let status = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission Denied Please allow permissions to use app'
        })
      }
      let location = await Location.getCurrentPositionAsync({})
      console.log(location)
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          location.coords.latitude
        }&lon=${location.coords.longitude}&units=imperial&APPID=${API_KEY}`
      );
      let weatherData = await response.json()
      console.log(weatherData)
      this.setState({
        weather: weatherData
      })
    }
    getLocationAsync()
  }



  render() {

               let weather;
            if (this.state.weather !== ""){
              weather = this.state.weather.list.map((day, i)=> {
                let date = day.dt_txt.slice(0, 10)
                let dayOfWeek = moment(date).format('dddd')
                if (this.state.weather.list.indexOf(day) % 8 === 0) {
                  return <View>
               <Elements.Text h1> {dayOfWeek} </Elements.Text>
               <Image style={styles.imagesStyle} source={{uri: `http://openweathermap.org/img/w/${day.weather[0].icon}.png`} } />
               <Text h4>
                 Avg: {Math.round(day.main.temp)}˚
                </Text>
                <Text h4>
                 High: {Math.round(day.main.temp_max)}˚
                </Text>
                <Text h4>
                 Low: {Math.round(day.main.temp_min)}˚
                </Text>
                <SwipeCards style={{flex: 1}} />
               </View>

            } })
              }



    return (
      <View style={styles.container}>

      <ImageBackground style={styles.ImageBackground} source={require('./assets/sky.jpg')}>
         {weather}
         </ImageBackground>


      </View>
    );
  }
}

export default createBottomTabNavigator(

  {
    "Todays Forecast": Weather,
    "Five Day Forecast": FiveDay
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      labelStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 13,
        marginBottom: 15
      }
    }
  }
  )
