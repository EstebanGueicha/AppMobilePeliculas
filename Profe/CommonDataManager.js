export default class CommonDataManager {

    static myInstance = null;

    _userID = "";
    _moviesJSON = "";


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }

    getUserID() {
        return this._userID;
    }

    setUserID(id) {
        this._userID = id;
    }

    getMoviesJSON(){

        // console.log("Estas son las peliculas que tengo ahora" + this._moviesJSON)
        if (this._moviesJSON == null || this._moviesJSON == undefined || this._moviesJSON == ""){
            // console.log({results: []})
            return {results: []}
        }
        
        return this._moviesJSON
       
    }

    setMoviesJSON(movies) {

        this._moviesJSON = movies;
    }

    refreshData() {
        // console.log("Llame desde el dismount")
        this._moviesJSON = {results: []}
    }
}