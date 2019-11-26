
import React from 'react';
import MovieProfile from '../Profe/movieProfile'
import CommonDataManager from '../Profe/CommonDataManager';
import MoviesDataManager from '../Profe/MoviesDataManager';

export default class PerfilPelicula extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      hasUpdated: false
    }
    const { navigation } = props;
    const itemId = navigation.getParam('id');
    if (this.state.hasUpdated != true) {
      MoviesDataManager.getInstance().getMovie(itemId, (responseJson) => {
        this.setState({ movie: responseJson, hasUpdated: true })
        return responseJson.movies;
      })
    }
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    CommonDataManager.getInstance().refreshData()
  }


  render() {


    return (
      <MovieProfile movie={this.state.movie}>

      </MovieProfile>

    );
  }
}

