import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import APIManager from '../components/APIController';
import DataUsu from '../components/UsuarioData';
import {Text } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: true,
        showpass:true,
        press:false,
    }
  }
  
  onPressCambiarContrasena = () => {

    if (this.state.registerPassword1 != this.state.registerPassword2) {
      alert("Las contraseñas no son iguales")
    } else {
      //ALMACENAR registerEmail y registerPassword1 en la base de datos

      let user = DataUsu.getInstance().getUserEmail();
      let pass = this.state.registerPassword1
      console.log(user + "    " + pass)
      APIManager.getInstance().changePassword(user, pass, (alerta) => {
        this.props.navigation.navigate('Home')
        alert("cambio contrasena");

      })
    }
  }
  showPass = () => {
    if(this.state.press == false) {
      this.setState({showpass: false, press: true})
    } else {
      this.setState({showpass: true, press: false})
    }
  }
  



  static navigationOptions = {title:'Cambio de Contraseña'};
  render() {
    const correo=DataUsu.getInstance().getUserEmail();
    return (
      
        <View >
        <View style={{alignItems:"center",alignContent:"center"}}>
        <Text h5 >Iniciado con {correo}</Text>
        </View>
        <Input
          containerStyle={styles.input}
          placeholder='Contraseña'
          secureTextEntry={this.state.showpass}
          autoCapitalize="none"
          placeholderTextColor='gray'
          
          onChangeText={
              (text) => {
                this.setState(
                  (previousState) => {
                    return {
                      registerPassword1: text
                    };
                  }
                )
              }
            }
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
          onChangeText={
              (text) => {
                this.setState(
                  (previousState) => {
                    return {
                      registerPassword2: text
                    };
                  }
                )
              }
            }
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
          buttonStyle={styles.boton}
          title='Cambiar contraseña'
          onPress={() => {
              this.onPressCambiarContrasena();
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
    marginTop: '10%'
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
