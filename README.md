# Login Firebase 
Este proyecto es sobre un login en reactjs con Firebase esto para permitir que los usuarios accedan a la aplicación con uno o más métodos de acceso, que incluyen el acceso con dirección de correo electrónico y contraseña y acceso con una cuenta de Google. 

## Instalar 
Instalamos las siguientes dependecias:

### Pasos 
1.-Instalamos firebase con el comando `$ npm i firebase`.
2.-Instalamos bootstrap con `$ npm install react-bootstrap bootstrap@5.1.3`.
3.-Instalamos el boton de google con `$ npm i  react-google-button`.
4.-Instalamos router con `$ npm i react-router-dom`.

### Ejecucion 

El programa fue ejecutado en el servidor local (http://localhost/3000). 

### Breve descripción del código 

#### reactjs　

##### Importamos de Firebase getAuth y en una contante firebaseConfig agregamos la configuración,  después exportamos la autentificación con la constante auth.

```reactjs
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

```
##### Dentro de la carpeta de src se creó otro carpeta con el nombre de context, adentro de esta folder contiene un archivo llamado UserAcountContext. En este archivo se importaron los métodos de autentificación de Firebase. Se implementaron funciones para la verificación, crear usuario, iniciar sesión con Google y cerrar sesión. Se utilizo useEfferct con onAuthStateChanged tiene que pasar la autentificación dando en usuario actual,  y cambiando de estado de autentificación del usuario actual con unsubscribe. 

```reactjs
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
```
##### Además se creó una carpeta componentes y tiene cuatro archivos Home, Login , ProtectRoute y Signup. Usamos una contante con useState para pasar los datos. constante handleSubmit asíncrona para prevenir algún error con try catch, si no hay error direcciona a home, y si hay error manda un mensaje. También se puede observar el formulario con las cajas de texto con el correo y contraseña un botón y el botón para entrar sesión con Google. 

```reactjs
//Constante de login. 
const Login = () => {
  //Usamos useState para pasar los datos.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  
  // constante handleSubmit asincrona para prevenir algun error con try catch,si no hay error direcciona a home, y si hay error manda un mensaje. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  
   return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />

```


##### Igual en Signup se utilizó una constante y useState para pasar los datos y un try catch por si había algun error., tambien se puede observar el login para crearte una cuenta. 

```reactjs
const Signup = () => {
   //Usamos useState para pasar los datos.
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  // constante handleSubmit asincrona con try catch para prevenir errores si hay error envia mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

```
##### En ProtectedRoute  se valida si el usuario esta registrado para protección.

```reactjs
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
//Validamos si el usuario esta registrado
  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;

```


#####  En App se estableció las rutas del login, home y Signup. 

```reactjs
function App() {
  return (
    <Container style={{ 
      width: "400px"
      }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

```

##### Autor Missael  Peralta. 







