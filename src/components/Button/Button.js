import React from "react";

const Button = ({ type, onclick, contenu, ...rest}) => {
	return (
		<button
			type={type}
			onClick={onclick}
			className='inline-block rounded w-1/4 h-9 bg-success  text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]'
			{...rest}
		>
			{contenu}
		</button>
	);
};

export default Button;
