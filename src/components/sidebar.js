import logo from "../assets/logo_smartBev.png";
import { Link } from "react-router-dom";
import { FaStore, FaUserFriends } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

const links = [
    {
        text: "Vending machines",
        icon: FaStore,
        url: "/"
    },
    {
        text: "Clients",
        icon: FaUserFriends,
        url: "/a"
    },
]

export function Sidebar() {
    return (
        <div className="w-[260px] h-full shadow-lg  fixed top-0 left-0 flex flex-col items-center">
            <div className="w-full h-40 flex justify-center items-center border-b-2 border-b-gray-200 mb-6" >
                <img src={logo} alt="logo smart Bev" />
            </div>

            <ul className=" flex flex-col gap-4 justify-center">
                {
                    links.map(link => (
                        <li key={link.url} >
                            <Link to={link.url} className="flex items-center gap-4" >
                                {<link.icon color={"#555555"} size={"20px"} />}
                                <span className="text-lg text-[#555555] capitalize">{link.text}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div className="w-full h-20 flex gap-4 items-center justify-center border-b-2 border-b-gray-200 mt-auto">
                <div className="rounded-full w-10 h-10 flex justify-center items-center bg-pink-400">MG</div>
                <div className="text-lg" >Moh Gezdia</div>
            </div>


            <Link to="/" className="w-full h-20 flex  justify-center items-center gap-4">
                <RxExit className="text-red-500 stroke-1" size={"20px"} />
                 <span className="text-lg text-red-500 capitalize">Log out</span>
            </Link>
        </div>
    );
}