import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { globalContext } from "../context";
import axios from "axios";
import logo from "../assets/logo_smartBev.png";
import { BACKEND_URL } from "../util/constants";
import Cookies from "js-cookie";

export function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const location = useNavigate();

	let url = BACKEND_URL + "/login";

	function handleLogin(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		// 	fetch(" https://smartbevdb-sil-rhap.onrender.com/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			email: email,
		// 			password: password,
		// 		}),
		// 		credentials: "include",
		// 	})
		// 		.then((response) => response.json())
		// 		.then((result) => {
		// 			console.log(result);

		// 			if (result.statusCode === 200) {
		// 				localStorage.setItem("user", JSON.stringify(result.data));
		// 				location("/SADM/distributeurs");
		// 			} else {
		// 				setErr(result.message);
		// 			}
		// 		});
		// }

		axios
			.post(
				url,
				{
					email: email,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			)
			.then((response) => {
				const result = response.data;
				console.log(response);

				if (result.statusCode === 200) {
					localStorage.setItem("user", JSON.stringify(result));
					location("/SADM/distributeurs");
				} else {
					setErr(result.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const [err, setErr] = useState("");

	return (
		<div className='w-full h-screen bg-green-800 flex justify-center items-center'>
			<form className='bg-white w-[400px]  rounded-lg p-8 flex flex-col gap-4'>
				<img src={logo} className='w-20 h-20 mx-auto' alt='logo SmartBev' />
				<h1 className='font-bold text-2xl text-center'>Login</h1>
				<h4 className='font-semibold text-md text-red-500 mb-8'>{err}</h4>

				<label htmlFor='email'>Email</label>
				<input
					ref={emailRef}
					type='email'
					id='email'
					name='email'
					placeholder='email'
					className='p-2 rounded-lg outline-none border-2 border-black'
					required
				/>

				<label htmlFor='password'>Password</label>
				<input
					ref={passwordRef}
					type='password'
					id='password'
					email='password'
					placeholder='password'
					className='p-2 rounded-lg outline-none border-2 border-black'
					required
				/>

				<button
					onClick={handleLogin}
					className='rounded-lg bg-green-800 p-2 text-white'
				>
					Login
				</button>

				<Link className='text-center text-green-800 text-sm'>
					forgot password?
				</Link>
			</form>
		</div>
	);
}
