import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../assets/logo_smartBev.png";
import { axiosInstance } from "../util/axios";

/**
 * the login page
 * @component
 * @returns {React.ReactElement}
 */
export function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const location = useNavigate();
	const [err, setErr] = useState("");

	async function handleLogin(e) {
		setErr("");
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const response = await axiosInstance.post("/login", {
				email,
				password,
			});
	
			console.log(response);
	
			if(response.data.statusCode === 200) {
			  localStorage.setItem("user", JSON.stringify(response.data.data) );
			  localStorage.setItem("token", response.data.data.token);
			  location(`/${response.data.data.role}`);
			} else {
				setErr("There was an error, verify your credentials or contact the admin")
			}
			
		} catch(e) {
			console.log(e);
			setErr("There was an error, verify your credentials or contact the admin")
		}
	}

	
    

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
