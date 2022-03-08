
import { createContext, useContext, useEffect, useState } from "react";
//importamos algunos metodos de autentificacion de firebase y la instancia auth para la autentificacion
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {auth} from "../firebase"

//En una constante y esto es igual al contexto de creacion 
const userAuthContext = createContext();

//funcion de provedor de contexto de verificacion de usuario
export function UserAuthContextProvider({ children }) {
  //constante con useState para acceder a los componentes.
  const [user, setUser] = useState({});

  //funcion para autentificar en el login
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  //funcion para crear usuario
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //Funcion para cerrar sesion
  function logOut() {
    return signOut(auth);
  }
  //funcion para iniciar sesion con autentificacion de google. 
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // use Effeect y con onAuthStateChanged tiene que pasar la autentificacion dando en usuario actual, 
  // y cambiando de estado de autentificacion del usuario actual con unsubscribe
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
//valores de registro
  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
// exportamos useUserAuth y retornamos el usecontext
export function useUserAuth() {
  return useContext(userAuthContext);
}