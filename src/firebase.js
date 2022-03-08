
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//configuracion de firebase 
const firebaseConfig = {
  apiKey: "AIzaSyC65aAGhohlx4al2x11LSSOaEFtv6Nbvmk",
  authDomain: "react-authentication-7474b.firebaseapp.com",
  projectId: "react-authentication-7474b",
  storageBucket: "react-authentication-7474b.appspot.com",
  messagingSenderId: "492992077121",
  appId: "1:492992077121:web:5b728115b5bfe1be41d5c0",
  measurementId: "G-MJ1RSPT2Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//exportacion creando constante de autentificacion y sera igual a la funcion para obtener la autentificacion 
export const auth = getAuth(app);

export default app;
