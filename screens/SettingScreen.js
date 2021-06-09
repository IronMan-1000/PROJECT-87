import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity, ImageBackground} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'
const image = { uri: "https://raw.githubusercontent.com/IronMan-1000/Barter-app-images/main/background.jpg" };
export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:''
    }
  }

 getData(){
  var user = firebase.auth().currentUser;
  var email= user.email

 db.collection('users').where('username','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         address:data.address,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })

}

 updateData(){

  db.collection('users').doc(this.state.docId)
    .update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address:this.state.address,
      contact:this.state.contact,
    })
}

componentDidMount(){
  this.getData()
}



    render(){
        return(

              <View style={{flex:1, justifyContent: 'center'}} >
                <MyHeader title="Settings" navigation ={this.props.navigation}/>
                <ImageBackground source={image} style={styles.image}>
                <View style={{flex:1,width:'100%',alignItems: 'center'}}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  placeholderTextColor= {"lightgreen"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  placeholderTextColor= {"lightgreen"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Contact"}
                  placeholderTextColor= {"lightgreen"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                    value ={this.state.contact}
                />
                <TextInput
                  style={styles.addressFormTextInput}
                  placeholder ={"Address"}
                  placeholderTextColor= {"lightgreen"}
                  multiline = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                  }}
                    value ={this.state.address}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Email"}
                  placeholderTextColor= {"lightgreen"}
                  keyboardType ={'email-address'}
                  onChangeText={(text)=>{
                    this.setState({
                      emailId: text
                    })
                  }}
                    value ={this.state.emailId}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.updateData()}}>
                  <Text> Save </Text>
                </TouchableOpacity>
                
                </View>
                </ImageBackground>
              </View>





        )
    }
}


const styles = StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'yellow',
      borderRadius:10,
      borderWidth:5,
      marginTop:20,
      padding:10,
      color: 'lightgreen'
    },
    addressFormTextInput:{
      width:"75%",
      height:90,
      alignSelf:'center',
      borderColor:'yellow',
      borderRadius:10,
      borderWidth:5,
      marginTop:20,
      padding:10,
      color: 'lightgreen'
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },
      image: {
    flex: 1,
    resizeMode: "fill",
  },

}
)