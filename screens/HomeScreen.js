import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  
} from 'react-native'
import APIManager from '../components/APIController';
import DataUsu from '../components/UsuarioData';
import { Button } from 'react-native-elements';
import { Header } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import logo from '../assets/images/LogoHome.png'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Input } from 'react-native-elements';


export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: true,
        showpass:true,
        press:false,
    }
}

login() {

  let user = this.state.typedEmail;
  let pass = this.state.typedPassword
  APIManager.getInstance().login(user, pass, (usuario) => {
    
    if (usuario == "" || usuario == undefined || null) {
      alert('usuario y/o contraseña no existen')
    } else {

      console.log("Usuario adentro:" + usuario.emai)
      DataUsu.getInstance().setUserData(usuario);
      this.props.navigation.navigate('YaLoegueado') 
      this.state.typedEmail=" ";
      this.state.typedPassword=" "
      this.clear();
    }
  });
  
}



showPass = () => {
  if(this.state.press == false) {
    this.setState({showpass: false, press: true})
  } else {
    this.setState({showpass: true, press: false})
  }
}

clear =() => { 
  this.textInputRef.clear(); 
} 
  
  
  


  static navigationOptions = {title:'Login'};
  render() {
    return (
      <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 30}
      behavior="position"
    >
    <ScrollView>
    <View style={{alignItems:"center"}}>
    <Image
       source={logo}
      style={{ width: 250, height: 200,resizeMode:"contain" }}
      PlaceholderContent={<ActivityIndicator />}
    />
    </View>

        <View style={styles.container2}>

        
        
          
          <Input
            containerStyle={styles.input}
            ref={ref => this.textInputRef = ref} 
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
                ref={ref => this.textInputRef = ref} 
                secureTextEntry={this.state.showpass}
                autoCapitalize="none"
                placeholderTextColor='gray'
                
                onChangeText={(text) => {
                    this.setState(() => {
                      return {
                        typedPassword: text
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
        
       
          <Button onPress={() => {
                this.login();
              }}
          color='rgb(0,0,0)'
          //style={styles.touchable}
          buttonStyle={styles.boton}
          title='Ingresar'
          />
        <Text/>
        
              <Button 
                title="Registrarse"
                //style={styles.touchable}
                buttonStyle={styles.boton}
                type="outline"
                onPress={() => { this.props.navigation.navigate('Registro')}}
                /> 

        <View style={styles.container5}>
            

      </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
  container2: {
    marginTop: '0%',
  },
  
  touchable: {
    marginLeft: '10%',
    width: '80%',
},
boton:{
    marginLeft: '10%',
    marginRight: '10%',

},
container5: {
  flex: 1,
  margin: 30,
  alignItems: 'center'
  
},
hyperlink:{
  margin:10,
},
eye:{
 // flexDirection: 'row',
  flex: 1,
},
btnEye:{
  alignContent: 'center'
}

})
