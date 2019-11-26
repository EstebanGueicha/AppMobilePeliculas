
export default class MoviesDataManager {

    static myInstance = null;

    _CommentsJSON = "";


    /**
     * @returns {MoviesDataManager}
     */
    static getInstance() {
        if (MoviesDataManager.myInstance == null) {
            MoviesDataManager.myInstance = new MoviesDataManager();
        }
        return this.myInstance;
    }
    getMovie(id, callback) {
        return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=d6941517cb63cfbde501a7b188c56f6f&api_key=d6941517cb63cfbde501a7b188c56f6f&language=es')
            .then((response) => response.json())
            .then((responseJson) => callback(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }
    buscarPelicula(filtro, callback) {
        return fetch('https://api.themoviedb.org/3/search/movie?api_key=d6941517cb63cfbde501a7b188c56f6f&query=' + filtro + '&include_adult=false&language=es')
            .then((response) => response.json())
            .then((responseJson) => callback(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }
    getPopularMovies(callback) {
        return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6941517cb63cfbde501a7b188c56f6f')
            .then((response) => response.json())
            .then((responseJson) => callback(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }
    
}