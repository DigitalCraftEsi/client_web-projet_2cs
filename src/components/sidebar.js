import logo from "../assets/logo_smartBev.png";
import { NavLink } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { useState, useEffect } from "react";

<<<<<<< HEAD
export function Sidebar({ links }) {
  const [user, setUser] = useState({
    nom: "Berkane",
    prenom: "Chamsou",
    id: 1,
    email: "chamsou_sadm@esi.dz",
    role: "SADM",
    telephone: "0123456789",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);

  return (
    <div className="w-[260px] h-screen shadow-lg sticky top-0 left-0 flex flex-col items-center">
      <div className="w-full h-40 flex justify-center items-center border-b-2 border-b-gray-200 mb-6">
        <img src={logo} alt="logo smart Bev" />
      </div>

      <ul className=" flex flex-col gap-4 justify-center">
        {links.map((link) => (
          <li key={link.url} className="sidebar-link">
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                `flex items-center gap-4 ${isActive ? "active" : ""}`
              }
            >
              {<link.icon color={"#555555"} size={"20px"} />}
              <span className="text-lg font-medium text-[#555555] capitalize">
                {link.text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink
        to="profile"
        className="w-full h-20 flex gap-4 items-center justify-center border-b-2 border-b-gray-200 mt-auto"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-pink-400 ">{`${user.nom[0].toUpperCase()}${user.prenom[0].toUpperCase()}`}</div>
        <div className="text-lg capitalize">{`${user.nom} ${user.prenom}`}</div>
      </NavLink>

      <NavLink
        to="/login"
        className="w-full h-20 flex  justify-center items-center gap-4"
      >
        <RxExit className="text-red-500 stroke-1" size={"20px"} />
        <span className="text-lg text-red-500 capitalize">Log out</span>
      </NavLink>
    </div>
  );
=======
export function Sidebar({ links, user }) {
	return (
		<div className='w-[260px] h-screen shadow-lg sticky top-0 left-0 flex flex-col items-center'>
			<div className='w-full h-40 flex justify-center items-center border-b-2 border-b-gray-200 mb-6'>
				<img src={logo} alt='logo smart Bev' />
			</div>

			<ul className=' flex flex-col gap-4 justify-center'>
				{links.map((link) => (
					<li key={link.url} className='sidebar-link'>
						<NavLink
							to={link.url}
							className={({ isActive }) =>
								`flex items-center gap-4 ${isActive ? "active" : ""}`
							}
						>
							{<link.icon color={"#555555"} size={"20px"} />}
							<span className='text-lg font-medium text-[#555555] capitalize'>
								{link.text}
							</span>
						</NavLink>
					</li>
				))}
			</ul>

			<NavLink
				to='profile'
				className='w-full h-20 flex gap-4 items-center justify-center border-b-2 border-b-gray-200 mt-auto'
			>
				<div className='rounded-full w-10 h-10 flex justify-center items-center bg-pink-400'>
					MG
				</div>
				<div className='text-lg'>{user}</div>
			</NavLink>

			<NavLink
				to='/login'
				className='w-full h-20 flex  justify-center items-center gap-4'
			>
				<RxExit className='text-red-500 stroke-1' size={"20px"} />
				<span className='text-lg text-red-500 capitalize'>Log out</span>
			</NavLink>
		</div>
	);
>>>>>>> lamine/AccountInfo
}
