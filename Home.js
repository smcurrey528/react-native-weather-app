import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image} from 'react-native';

export default class Home extends React.Component {
  render() {
     setTimeout(() => {
      this.props.navigation.navigate('Weather')
     }, 5000)
    return (
      <View style={styles.container}>
      <ImageBackground style={styles.ImageBackground} source={require('./assets/sky.jpg')}>
        <Image style={styles.Logo} source={require('./assets/weather.png')} />
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  ImageBackground: {
     width: Dimensions.get("window").width,
     height: Dimensions.get("window").height,
  },
  Logo: {
     width: 300,
     height: 230,
     justifyContent: 'center',
     padding: 100,
  }
});
