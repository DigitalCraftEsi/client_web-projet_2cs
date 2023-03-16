import { Link } from "react-router-dom";

export function Login() {
  return (<div className="w-full h-full bg-green-800 flex justify-center items-center">
    <form className="bg-white min-w-[300px]  rounded-lg p-8 flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-center mb-8">Login</h1>

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="email" className="p-2 rounded-lg outline-none border-2 border-transparent focus:border-green-500" required />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" email="password" placeholder="password" className="p-2 rounded-lg outline-none border-2 border-transparent focus:border-green-500" required />

      <button className="rounded-lg bg-green-800 p-2 text-white">Login</button>

      <Link className="text-center text-green-800 text-sm">forgot password?</Link>
    </form>
  </div>);
}
