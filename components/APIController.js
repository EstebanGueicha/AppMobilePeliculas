export default class APIManager {

    static myInstance = '';
  
    APIManager = "";
    /**
     * @returns {APIManager}
     */
    static getInstance() {
      if (APIManager.myInstance == '') {
        APIManager.myInstance = new APIManager();
      }
  
      return this.myInstance;
    }
    login(mail, pass, callback) {
       console.log("Entrando a la funcion log in con:" + mail + pass)
      return fetch('https://tpobackend.herokuapp.com/mobilebackend/leerusuario', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: mail,
            contrasena: pass,
        }),
      }).then(res => res.json())
        .then(res => {
           console.log(res);
          return callback(res);
        }).catch((error) => {
          alert("usuario y/o contraseña no existen")
        });
    }
  
    guardarUsuario(nom,user, pass, callback) {
      fetch('https://tpobackend.herokuapp.com/mobilebackend/insertUsuario', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email: user,
            nombre:nom,
            contrasena: pass,
        })
      })
        .then((alerta) => callback(alerta))
    }
  
    changePassword(mail, pass, callback) {
      return fetch('https://tpobackend.herokuapp.com/mobilebackend/cambiarContrasena', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: mail,
            contrasena: pass,
        }),
      }).then(res => {
        callback(true);
        return true;
      }).catch((error) => {
        callback(false);
        console.log(error);
      });
    }
  }