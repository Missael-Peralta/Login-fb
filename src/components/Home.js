import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAcountContext";
//creacion de contante home 
const Home = () => {
  //autentificacion del usuario
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  //funcion handleLogout asincrona con try catch
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    //mensaje de bienvenida al usuario y un boton para cerrar sesion.
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
