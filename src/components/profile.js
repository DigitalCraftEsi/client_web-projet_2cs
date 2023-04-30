<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import Form from "./Form";
import { useState } from "react";
>>>>>>> lamine/AccountInfo

export function Profile() {
	const [profileData, setProfileData] = useState({
		firstName: "Lamine",
		lastName: "Brahami",
		email: "jl_brahami@esi.dz",
		phone: "0552186484",
		role: "admin",
		password: "",
	});

<<<<<<< HEAD
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
        setUser(data);
    }, [])

=======
	const handleSubmit = (newInputs) => {
		setProfileData({
			...profileData,
			firstName: newInputs[0],
			lastName: newInputs[1],
			email: newInputs[2],
			phone: newInputs[3],
			role: newInputs[4],
			password: newInputs[5],
		});
	};
>>>>>>> lamine/AccountInfo

	return (
		<div className='w-full p-10 flex flex-col gap-8'>
			<h1 className='text-2xl font-bold'>My profile</h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>
					Informations
					<Form data={profileData} onSubmit={handleSubmit} />
				</h3>

<<<<<<< HEAD
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
=======
				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {profileData.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {profileData.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {profileData.phone}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Role : {profileData.role}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Password : (not changed 69 days ago)
					</div>
				</div>
			</div>
		</div>
	);
}
>>>>>>> lamine/AccountInfo
