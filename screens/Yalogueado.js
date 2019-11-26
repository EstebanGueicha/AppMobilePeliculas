import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native'
import DataUsu from '../components/UsuarioData';
import { Button,Text } from 'react-native-elements';


export default class Yalogueado extends React.Component {


    
    render(){
        return(

            <View  style={{marginTop:'5%'}}
            >
                <Text h1
                style={{alignItems:'center',textAlign:'center'}}
                >
                    Bienvenido a Q^PELICULAS
                </Text>
                <Text
                h1
                style={{alignItems:'center',textAlign:'center'}}
                >{DataUsu.getInstance().getUserName()}</Text>
                <View style={{marginTop:'10%'}}>

                <Button
                title="Cambiar Contraseña"
                buttonStyle={styles.boton}
                onPress={() => { this.props.navigation.navigate('CambioPass')}}
                />
                <Text/>
                <Button
                title="Salir"
                buttonStyle={styles.boton}
                onPress={() => { this.props.navigation.navigate('Home')}}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boton:{
        marginLeft: '10%',
        marginRight: '10%',
    
    }
})