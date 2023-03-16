import ClientInfo from "./components/ClientInfo/ClientInfo"; 
import AccountInfo from "./components/AccountInfo/AccountInfo";
import Button from "./components/Button/Button";
import AddForm from "./components/AddForm/AddForm";

  
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
    <div>
      <ClientInfo data = {data} />
      <AccountInfo data={[]} />
      <AddForm />      
      <button onClick={tru()}>Hello</button>
    </div>
  );
}

function tru() {
  console.log("hi")
}

export default App;
