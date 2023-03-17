import React from "react";

const Button = (props) => {
	return (
		<button
			type={props.type}
			onClick={props.onclick}
			className='inline-block rounded w-1/4 bg-success px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]'
		>
			{props.contenu}
		</button>
	);
};

export default Button;
