

export function Profile() {

    const data = {
        nom: "islam",
        prenom: "someone",
        email: "some@gmil.dz",
        telephone: "123456789",
        role: "admin",
        password: ""
    }

    return (
        <div className="w-full p-10 flex flex-col gap-8">
            <h1 className="text-2xl font-bold">My profile</h1>

            <div className="bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
                <h3 className="text-lg font-semibold">Informations <span className="text-success underline cursor-pointer">Edit</span></h3>

                <div className="w-full grid grid-cols-2" >
                    <div className="col-span-1 font-medium" >Nom: {data.nom}</div>
                    <div className="col-span-1 font-medium" >Prenom: {data.prenom}</div>
                    <div className="col-span-1 font-medium" >Email: {data.email}</div>
                    <div className="col-span-1 font-medium" >Telephone: {data.telephone}</div>
                    <div className="col-span-1 font-medium" >Role: {data.role}</div>
                    <div className="col-span-1 font-medium" >Password: (not changed 69 days ago)</div>
                </div>
            </div>
        </div>
    );
}