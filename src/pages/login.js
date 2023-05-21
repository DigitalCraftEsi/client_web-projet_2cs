import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../assets/logo_smartBev.png";
import { axiosInsance } from "../util/axios";

export function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const location = useNavigate();

	async function handleLogin(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const response = await axiosInsance.post("/login", {
			email,
			password,
		});

		console.log(response);

		if (response.data.statusCode === 200) {
			localStorage.setItem("user", JSON.stringify(response.data.data));
			location(`/${response.data.data.role}`);
		}
	}

	const [err, setErr] = useState("");

	return (
		<div className='w-full h-screen bg-green-800 flex justify-center items-center'>
			<form className='bg-white w-[400px]  rounded-lg p-8 flex flex-col gap-4'>
				<img src={logo} className='w-20 h-20 mx-auto' alt='logo SmartBev' />
				<h1 className='font-bold text-2xl text-center mb-4'>Login</h1>
				<h4 className='font-semibold text-md text-red-500'>{err}</h4>

				<label htmlFor='email'>Email</label>
				<input
					ref={emailRef}
					type='email'
					id='email'
					name='email'
					placeholder='email'
					className='p-2 rounded-lg outline-none border-2 border-black '
					required
				/>

				<label htmlFor='password'>Password</label>
				<input
					ref={passwordRef}
					type='password'
					id='password'
					email='password'
					placeholder='password'
					className='p-2 rounded-lg outline-none border-2 border-black '
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
