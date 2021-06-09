import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import styled,{keyframes} from 'styled-components';
import {bounce} from 'react-animations';
import db from "../config";
import firebase from "firebase";
import BarterAnimation from "../components/BarterAnimationScreen.js";
const image = { uri: "https://raw.githubusercontent.com/IronMan-1000/Barter-app-images/main/background.jpg" };
const Bounce = styled.div`animation: 10s ${keyframes`${bounce}`} infinite`;
export default class WelcomeScreen extends React.Component {
  goToLoginScreen=()=> {
      this.props.navigation.navigate('LoginScreen')
    }
    goToSignUpScreen=()=> {
      this.props.navigation.navigate('SignUpScreen')
    }
  render() {
    return (
      
      <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      
       <View style={styles.profileContainer}>
          <Bounce><Image
         style={styles.tinyLogo1}
        source={require('../assets/barter.gif')}
         /></Bounce>
          <Text style={styles.title}>BARTER</Text>
          <Text style={{ color: "#ff8a65" }}> A Trading Method </Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.info}>
        This is the Barter App. A place where you can get connected to each and share items with each other. Need a item this is the right place to get it. It is totally free. You can try it. Interested then lets help you make an account.👇
        </Text>
        </View>

        <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={this.goToLoginScreen}
            >
              <Text
                style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.goToSignUpScreen}
            >
              <Text
                style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe0b2"
  },
  image: {
    flex: 1,
    resizeMode: "fill",
  },
  profileContainer: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 60,
    fontWeight: "300",
    fontFamily: "AvenirNext-Heavy",
    color: "#ff9800",
    textshadowColor:"red",
    textShadowRadius: 10,
    textshadowOpacity: 10
  },
  tinyLogo1: { 
    marginTop: 10,
    width: 200,
    height: 250,
    //marginLeft: 10,
  },
   button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "lightgreen",
    elevation: 10
  },
  info: {
    color: 'yellow',
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "AvenirNext-Heavy",
    fontWeight: "300",
    fontSize: 21,
    marginLeft: 10
  }
  
});