import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';


const URL = "https://api.themoviedb.org/3/movie/550?api_key=";
const apiKEY="d6941517cb63cfbde501a7b188c56f6f";

export default class Buscador extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      texto: "",
      movies: []
    };
  }

  actualizarBusqueda = texto => {

    let movies = [];

    if (texto.length > 4) {

      fetch(`${URL}${apiKEY}${texto}`)
      .then(result => result.json())
   
      .then(movies_json => {
        if (movies_json.Response == "True") {
          movies_json.texto.forEach(movie_value => {
            let { poster_path, title, release_date, id } = movie_value;
            let movie = {poster_path, title, release_date, id};
            movies.push(movie);
          });
          this.setState({ movies });
        }
      })
      .catch(error => console.log(error));
    }

    this.setState({ texto, movies });
  }
  
  render() {

    let lista = <Text></Text>;

    if (this.state.movies.length > 0) {
      lista = this.state.movies.map((movie, i) => (
        <ListItem
          key={i}
          leftAvatar = {{ source: { uri: movie.poster_path } }}
          title = {movie.title}
          subtitle = {movie.release_date}
          onPress = {() => console.log("onPress:", movie.id)}
        />
      ));
    }

    return (
      <ScrollView>
      <SearchBar
        placeholder = "Buscar una Pelicula"
        onChangeText = { this.actualizarBusqueda }
        value = { this.state.texto }  
       
        />
        {lista}
        
      </ScrollView>
      );
    }
}
