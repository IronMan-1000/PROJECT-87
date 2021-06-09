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
 Modal,
 ScrollView,
 KeyboardAvoidingView
} from "react-native";

import db from "../config";
import firebase from "firebase";
const image = { uri: "https://raw.githubusercontent.com/IronMan-1000/Barter-app-images/main/background.jpg" }
export default class SignUpScreen extends React.Component {
   goToLoginScreen=()=> {
      this.props.navigation.navigate('LoginScreen')
    }
  constructor(){
    super()
    this.state={
      username : '',
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      mobileNumber:"",
      address : "",
      confirmPassword : ""
    }
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
  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}
            >Registration</Text>
            <Text style={{color: "orange"}}>Please fill the form!!</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
render(){
    return(
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
        <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
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
          </View>
        </ImageBackground>
        </View>
    )
}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffe0b2'
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"lightblue",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
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
    color: "#ff9800"
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
})