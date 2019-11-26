import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TextInput, KeyboardAvoidingView,ImageBackground } from 'react-native'
import DataUser from '../components/UsuarioData'
import DataComentario from '../components/ComentarioController'
import { ListItem,Button } from 'react-native-elements'
import { Header } from 'react-navigation';

//https://stackoverflow.com/questions/42847263/how-to-render-a-loader-until-data-is-fetched-in-react-native
export default class MovieProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: true,
          comentario: "",
          lista: [],
          hasUpdated: false,
        }
      }

      setTheCall(comentario, usuario) {
        //console.log('id ' + usuario + 'mensaje' + comentario + 'movie' + this.props.movie)
        DataComentario.getInstance().insertComment(this.props.movie.title,usuario,this.props.movie.id,comentario,() => DataComentario.getInstance().updateLista(this.props.movie.id, (comments) => {
          // this.comments.map((item) => alert(item.comentario))
          this.setState({
              lista: comments,
          })
      }))
      alert("Comento con exito my friend");
  }

NecesitoLogin(){
  const correo = DataUser.getInstance().getUserEmail();
  if(correo !== null && correo !== ''){

     return(
    <View>
    <TextInput
          style={styles.input}
          placeholder='Escriba su comentario...'
          textAlignVertical='top'
          autoCapitalize="none"
          placeholderTextColor='gray'
          multiline={true}
          onChangeText={
                            (text) => {
                                this.setState(
                                    (previousState) => {
                                        return {
                                            comentario: text
                                        };
                                    }
                                )
                            }
                        }
        />
         <Button
        
          buttonStyle={styles.boton}
          title='Comentar'
          onPress={() =>
           {
            this.setTheCall(this.state.comentario, DataUser.getInstance().getUserEmail())
            }}
        />
        </View>
     )
      }
      else{
        return(
        <View style={{backgroundColor:'red'}}>
          <Text style={{fontSize:20, margin:10, fontWeight: 'bold', color:'white'}}>Debe estar logueado para comentar.</Text>
        </View>
        )
      }
}



    render() {
      const URLIMG = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

      if (this.state.hasUpdated == false) {
        DataComentario.getInstance().updateLista(this.props.movie.id, (comments) => {
            // this.comments.map((item) => alert(item.comentario))
            console.log("carga "+comments.email+" "+comments.id," "+comments.titulo+" "+comments.comentario)
            this.setState({
                lista: comments,
                hasUpdated: true,
            })
        });
    }




        return (
          
        <ImageBackground  style={styles.backgroundImage} source={{ uri: URLIMG + this.props.movie.poster_path }}>
    <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + 30}
          behavior="position"
        >
    <ScrollView style={styles.scroll}>
    
    <Text style={styles.titulo}>{this.props.movie.title}</Text>
    <Text style={styles.overview}> {this.props.movie.overview} </Text>
    <Text style={styles.overview}> {'Estreno: ' + this.props.movie.release_date} </Text>
    <Text style={styles.minimos}>{'Popularidad:' + this.props.movie.popularity} </Text>
    <Text style={styles.minimos}> {'Sitio web: '+ this.props.movie.homepage} </Text>
    <Text style={styles.minimos}> {'Valoración: ' + this.props.movie.vote_average} </Text>
    <View style={styles.container2}>
          {this.NecesitoLogin()}
        <KeyboardAvoidingView
          behavior="padding"  
        />
        </View>
        <View style={{margin:10}}>
          <View style={{margin:5}}>
            <Text style={{fontSize:20, textAlign:'center', color:'white'}}>Comentarios</Text>
          </View>
     {
      this.state.lista.map((item, i) => (
      <ListItem
        key={i}
        leftAvatar={{ title: item.email.charAt(0) }}
        title={item.email}
        subtitle={item.comentario}
      />
    ))
  }
    </View>
    
    </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
    
    
   
        )
        }
      }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll:{

      backgroundColor: 'rgba(52, 52, 52, 0.85)',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      padding: 20,
      justifyContent: 'center',
  
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
      },
      titulo: {
        flex: 1,
        padding: 20,
        color: '#42a5f5',
        fontSize: 40,
        textShadowColor: 'white',
        textShadowRadius:5,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      overview: {
        flex: 1,
        fontSize: 19,
        padding:20,
        color:'white',
        fontWeight:'bold',
    },
    minimos: {
        flex: 1,
        fontSize: 19,
        textAlign: 'left',
        color:'white',
        padding:20,
        fontWeight:'bold',
  },
  input: {
    width: 350,
    height: 120,
    backgroundColor: 'white',
    margin: 10,
    marginLeft:'15%',
    marginRight: '15%',
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '200',
  },
  touchable: {
    marginLeft: '10%',
    width: '80%',
},
boton:{
    marginLeft: '15%',
    marginRight: '15%',
},
container2: {
  flex: 1,
  margin: 3,
  alignItems: 'center',
}
})
const resizeMode = 'center';
