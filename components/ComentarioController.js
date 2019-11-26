import DataUser from "./UsuarioData";

export default class CommentsDataManager {

  static myInstance = null;

  _CommentsJSON = "";


  /**
   * @returns {CommentsDataManager}
   */
  static getInstance() {
    if (CommentsDataManager.myInstance == null) {
      CommentsDataManager.myInstance = new CommentsDataManager();
    }
    return this.myInstance;
  }
  getCommentsByID(mail) {
    return this._CommentsJSON;
  }

  updateLista(idPelicula, callback) {
    fetch('https://tpobackend.herokuapp.com/mobilebackend/leerComentario', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idPelicula })

    }).then(responseJson => responseJson.json())
    .then((responseJson) => {
        CommentsDataManager.getInstance().setCommentsJSON(responseJson)
      
      callback(responseJson)
      console.log("Estoy devolviendo esto:" + responseJson)
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
}


  setCommentsJSON(comments) {
    this._CommentsJSON = comments;
  }


  getCommentsFromApi(callback) {
    // console.log("Entre a getComments From aapi")
    let email = UserDataManager.getInstance().getUserEmail()
    return fetch('https://review-flix-api.herokuapp.com/rutes/getComentariosUsuario', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: email,
      }),

    }).then(responseJson => responseJson.json())
      .then((responseJson) => {
        CommentsDataManager.getInstance().setCommentsJSON(responseJson)
        // console.log("Estoy devolviendo esto:" + responseJson)
        callback(responseJson)
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });
  }




  setCommentsJSON(comments) {
    this._CommentsJSON = comments;
  }

  insertComment(title,usuario, idPelicula,comment, callback) {
    fetch('https://tpobackend.herokuapp.com/mobilebackend/insertComentario', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: title,
        email: usuario,
        id: idPelicula,
        comentario: comment
      })

    })
      .then((response) => response.text())
      .then((responseText) => {
    
        callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}