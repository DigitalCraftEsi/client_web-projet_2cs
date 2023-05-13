import React, { useState } from "react";
import { ProfileConsumer } from "./ProfileConsumer";
import { ReclamationDetails } from "./ReclamationDetails";
import Button from "../Button/Button";

export default function Reclamation() {
	const [treated, setTreated] = useState(false);

	const toggle = () => {
		setTreated(!treated);
	};

	return (
		<div className='w-full flex flex-col '>
			<ReclamationDetails></ReclamationDetails>
			<ProfileConsumer></ProfileConsumer>
			<div className='flex items-center justify-end mr-10 my-8'>
				<Button
					type='Button'
					onClick={toggle}
					color='success'
					contenu='Marquer comme terminée'
				>
					{" "}
				</Button>
			</div>
		</div>
	);
}
