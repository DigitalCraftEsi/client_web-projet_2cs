import { useState, useEffect } from "react";

export function Profile() {


    const [user, setUser] = useState({
        nom: "Berkane",
        prenom: "Chamsou",
        id: 1,
        email: "chamsou_sadm@esi.dz",
        role: "SADM",
        telephone: "0123456789"
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        if(data != null) {
            setUser(data);
        }
    }, [])


	return (
		<div className='w-full p-10 flex flex-col gap-8'>
			<h1 className='text-2xl font-bold'>My profile</h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>
					Informations
					{/* <Form data={profileData} onSubmit={handleSubmit} /> */}
				</h3>

                <div className="w-full grid grid-cols-2" >
                    <div className="col-span-1 font-medium" >Nom: {user.nom}</div>
                    <div className="col-span-1 font-medium" >Prenom: {user.prenom}</div>
                    <div className="col-span-1 font-medium" >Email: {user.email}</div>
                    <div className="col-span-1 font-medium" >Telephone: {user.telephone}</div>
                    <div className="col-span-1 font-medium" >Role: {user.role}</div>
                    <div className="col-span-1 font-medium" >Password: *******</div>
                </div>
            </div>
        </div>
    );
}
