import React from 'react'
import Button from '../Button/Button'

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      motDePasse: ""
    };
  }

   updateInfos() {
    this.setState({
      "nom": "Brahami",
      "prenom": "Lamine",
      "telephone": "0552166484",
      "email": "jl_brahami@esi.dz",
      "motDePasse": "Hola"
    })
    }
  
  render() {
    return (
      <div className='container border-solid border-2 rounded w-96 p-5 m-5'>
      <p className='mb-6'><b>Ajouter un compte administrateur</b></p>
      <form>
      <label>
      Nom 
      <br></br>
      <input
        type="text"
        className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </label>
      <br></br>
      <label>
            Prenom 
            <br></br>
            <input
        type="text"
        className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
          </label>
          <br></br>
      <label>
            Email 
            <br></br>
            <input
        type="email"
        className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
          </label>
          <br></br>
      <label>
            Telephone (optionnel) 
            <br></br>
            <input
        type="tel"
        className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
          </label>
          <br></br>
      <label>
            Mot de passe 
            <br></br>
            <input
        type="password"
        className="peer block min-h-[auto] w-full mb-5 rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlInputText"
        placeholder="Example label" />
      </label>    
      </form>
        <Button contenu="Ajouter" onclick={this.updateInfos} />
      </div>
    )
  }

  
}



export default AddForm