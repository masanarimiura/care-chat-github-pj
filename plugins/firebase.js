import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyD3wqRaDUxpw436HA5IUT7OarkPgNj5Gtc",
      authDomain: "care-chat-firebase-pj.firebaseapp.com",
      projectId: "care-chat-firebase-pj",
      storageBucket: "care-chat-firebase-pj.appspot.com",
      messagingSenderId: "612616425132",
      appId: "1:612616425132:web:1c1dab70535605f7f35909",
      measurementId: "G-J108RFBXVS"
    }
  )
}

export default firebase