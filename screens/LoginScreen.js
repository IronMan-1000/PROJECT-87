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

import db from "../config";
import firebase from "firebase";
import BarterAnimation from "../components/BarterAnimationScreen.js";
const image = { uri: "https://raw.githubusercontent.com/IronMan-1000/Barter-app-images/main/background.jpg" };
export default class LoginScreen extends React.Component {
  goToSignUpScreen=()=> {
      this.props.navigation.navigate('SignUpScreen')
    }
  constructor() {
    super();
    this.state = {
       username : '',
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      mobileNumber:"",
      address : "",
      confirmPassword : ""
    };
  }

   userLogin = (username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(()=>{
      this.props.navigation.navigate('HomeScreen')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
     alert(errorMessage)
    })
  }

  userSignUp = (username, password,confirmPassword) =>{
    if(password !== confirmPassword){
        alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((response)=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          mobile_number:this.state.mobileNumber,
          username:this.state.username,
          address:this.state.address
        })
      alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
    }
  }
  

  render() {
    return (
      
      <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.profileContainer}>
          <Image
         style={styles.tinyLogo1}
        source={require('../assets/barter.gif')}
         />
          <Text style={styles.title}>BARTER</Text>
          <Text style={{ color: "#ff8a65" }}> A Trading Method </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: "#ff5722",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 15,
              
            }}
          >
            USERNAME
          </Text>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.loginBox}
              keyboardType="email-address"
              placeholder ={"  Pls enter your email-address."}
              onChangeText={text => {
                this.setState({
                  username: text
                });
              }}
            />
          </View>
          <Text
            style={{
              color: "#ff5722",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 15
            }}
          >
            PASSWORD
          </Text>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              placeholder ={"      Pls enter your password."}
              onChangeText={text => {
                this.setState({
                  password: text
                });
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => {
                this.userLogin(this.state.username, this.state.password)
              }}
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
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 60,
    fontWeight: "300",
    fontFamily: "AvenirNext-Heavy",
    color: "#ff9800"
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: "#ffab91",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 25,
    backgroundColor: "#ffe0b2"
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
  buttonContainer: {
    flex: 1,
    marginTop: 33
  },
  tinyLogo1: { 
    marginTop: 10,
    width: 200,
    height: 250,
    //marginLeft: 10,
  },
  image: {
    flex: 1,
    resizeMode: "fill",
  },
});