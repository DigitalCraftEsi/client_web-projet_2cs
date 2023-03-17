import ClientInfo from "./components/ClientInfo/ClientInfo"; 
import AccountInfo from "./components/AccountInfo/AccountInfo";

  
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
    
  return (
    <div>
      <ClientInfo data = {data} />
      <AccountInfo data={data} />
    </div>
  );
}

export default App;
