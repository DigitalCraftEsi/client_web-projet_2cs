import ClientInfo from "./components/ClientInfo/ClientInfo";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import FormClient from "./components/FormClient/FormClient";
import FormVendingMachine from "./components/FormVendingMachine/FormVendingMachine";
import FormAssigning from "./components/FormAssigning/FormAssigning";

function App() {
	let data = [
		{
			nom: "Brahami",
			prenom: "Lamine",
			telephone: "0552166484",
			email: "jl_brahami@esi.dz",
			motDePasse: "Hola",
		},
	];

	return (
		<div>
			<ClientInfo data={data} />
			<AccountInfo data={[]} />
			<FormClient contenu1='Nouveau client' contenu2='' />
			<FormVendingMachine contenu1='Nouveau distributeur' contenu2='' />
			<FormAssigning contenu1='Assigner' contenu2='' />
		</div>
	);
}

export default App;
