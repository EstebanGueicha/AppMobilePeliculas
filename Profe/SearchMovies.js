import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import CommonDataManager from '../Profe/CommonDataManager';
import MoviesDataManager from '../Profe/MoviesDataManager';
import { SearchBar, Button  } from 'react-native-elements';
import List from '../Profe/List'




export default class SearchMovies extends React.Component {




    
    constructor() {
        super();
        this.state = {
            updated: true,
            filtro: ''
        }
        //MoviesDataManager.getInstance().getPopularMovies(this.updatePeliculas)
    }
    componentWillUnmount() {
        CommonDataManager.getInstance().refreshData()
    }
    onPressBuscarPelicula(filtro) {
        if (filtro == "" || filtro == undefined || filtro == null) { return }
        // console.log("Entre a la funcion con: \n" + filtro)
        MoviesDataManager.getInstance().buscarPelicula(filtro, this.updatePeliculas)
    }
    updatePeliculas = (responseJson) => {
        CommonDataManager.getInstance().setMoviesJSON(responseJson);
        this.setState({ updated: !this.state.updated });
        return responseJson.movies;
    }
    
    static navigationOptions = {title:'Buscador'};

   

    render() {
        const navigator = this.props.navigation;

        


        return (
            <View >
               
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
               
                <SearchBar
                    placeholder = "Buscar una Pelicula"
                    
                    inputStyle={{color:'white'}}
                    round
                    containerStyle={{marginRight:'3%',marginLeft:'3%',backgroundColor:'white',borderBottomColor:'white',borderTopColor:'white'}}
                    onChangeText={
                        (text) => {
                            this.setState(
                                (previousState) => {
                                    return {
                                        filtro: text
                                    };
                                }
                            )
                        }
                    }
                    value = { this.state.filtro }  
                    />
                <Text/>

                <Button 
                title="Buscar"
                style={styles.touchable}
                buttonStyle={styles.boton}
                onPress={() => {
                      
                        // console.log(this.state.filtro)
                        this.onPressBuscarPelicula(this.state.filtro)
                    }
                    }>

                </Button>
                
                <Text/>
                <View>
                    <List navigator={navigator} />

                </View>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    
    touchable: {
        marginLeft: '10%',
        width: '80%',
    },
    boton:{
        marginLeft: '20%',
        marginRight: '20%',
   
    }
})
