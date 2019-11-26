import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import APIManager from '../components/APIController';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Valido from 'email-validator';


export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: true,
        showpass:true,
        press:false,
        validated : false,
    }
  }

  onPressRegistrarUsuario = () => {
    this.go()
    if(this.state.validated===false){
      alert("email no valido")
    }else{
    if (this.state.registerPassword1 != this.state.registerPassword2) {
      alert("Las contraseñas no son iguales")
    } else {
      

      let user = this.state.typedEmail;
      let pass = this.state.registerPassword1
      let nom= this.state.nombre;
      console.log(user + "    " + pass)
      APIManager.getInstance().guardarUsuario(nom,user, pass, (alerta) => {
        this.props.navigation.navigate('Home')
        alert("Registro exitoso! "+ nom);
      })
    }
  }
  }
  go = () => {  
    const a= Valido.validate(this.state.typedEmail)
    if(a!=true){
    this.setState({ validated : false });
    }else{
    }this.setState({ validated : true });
}

  showPass = () => {
    if(this.state.press == false) {
      this.setState({showpass: false, press: true})
    } else {
      this.setState({showpass: true, press: false})
    }
  }


  static navigationOptions = {title:'Registro'};
  render() {
    return (
      
        <View >
        <Input
          containerStyle={styles.input}
          placeholder='Nombre'
          autoCapitalize="none"
          placeholderTextColor='gray'
         
          onChangeText={
              (text) => {
                this.setState(
                  (previousState) => {
                    return {
                      nombre: text
                    };
                  }
                )
              }
            }
        />
        <Input
          containerStyle={styles.input}
          placeholder='Correo Electrónico'
          autoCapitalize="none"
          placeholderTextColor='gray'
          
          onChangeText={
              (text) => {
                this.setState(
                  (previousState) => {
                    return {
                      typedEmail: text
                    };
                  }
                )
              }
            }
        />
        <Input
          containerStyle={styles.input}
          placeholder='Contraseña'
         
          autoCapitalize="none"
          placeholderTextColor='gray'
          secureTextEntry={this.state.showpass}
          onChangeText={(text) => {
            this.setState(() => {
              return {
                registerPassword1: text
              };
            })
          }}
          rightIcon={
                  <TouchableOpacity style={styles.btnEye}
                    onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ? 'visibility-off' : 'visibility'} 
                    size={26} color={'black'}  />
                  </TouchableOpacity>
                }
        />
        <Input
          containerStyle={styles.input}
          placeholder='Re-Contraseña'
          autoCapitalize="none"
          placeholderTextColor='gray'
         
          secureTextEntry={this.state.showpass}
          onChangeText={(text) => {
            this.setState(() => {
              return {
                registerPassword2: text
              };
            })
          }}
          rightIcon={
                  <TouchableOpacity style={styles.btnEye}
                    onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ? 'visibility-off' : 'visibility'} 
                    size={26} color={'black'}  />
                  </TouchableOpacity>
                }
        />

        <Text/>

        <Button
        //color='rgb(0,0,0)'
        
          buttonStyle={styles.boton}
          title='Registrarse'
          onPress={() => {
              this.onPressRegistrarUsuario();
            }}
        />
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 45,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    borderRadius: 14,
   
  },
  image: {
    width: 190,
    height: 200,
    borderRadius: 20
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    flex: 1,
    margin: 3,
    alignItems: 'center'
  },
  container3: {
    flex: 1,
    margin: 3,
    alignItems: 'center'
  },
  btn: {
    width: 350,
    height: 45,
    backgroundColor: 'rgb(50,156,129)',
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '200',
  },
  touchable: {
    marginLeft: '10%',
    width: '80%',
},
boton:{
  
  marginLeft: '10%',
  marginRight: '10%',
}
})
