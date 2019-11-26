export default class UserDataManager {

    static myInstance = null;

    _mail = "";
    _nom = "";
   


    /**
     * @returns {UserDataManager}
     */
    static getInstance() {
        if (UserDataManager.myInstance == null) {
            UserDataManager.myInstance = new UserDataManager();
        }

        return this.myInstance;
    }


    getUserEmail() {
        return this._mail
    }

    getUserName() {
        return this._nom
    }

    setUserData(userData) {
        this._mail = userData.email
        this._nom = userData.nombre
    }
}