import React from "react";
import { Sidebar } from "./components";

  
function App() {

  let data = [
    {
      "nom": "Brahami",
      "prenom": "Lamine",
      "telephone": "0552166484",
      "email": "jl_brahami@esi.dz",
      "motDePasse": "Hola"
    }
  ]
    
  console.log(data.length)
  return (
    <>
    <Sidebar />
    </>
  );
}

function tru() {
  console.log("hi")
}

export default App;
