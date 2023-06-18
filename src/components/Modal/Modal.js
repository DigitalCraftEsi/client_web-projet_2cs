import React from "react";
import Button from "../Button/Button";
import "./Modal.css";

export default function Modal(props) {

    if (props.modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const toggleModal = props.modalFun
    const actionButton = () => {
        props.actionHandler()
        toggleModal()
    }

    return (
        <>
            {props.modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h1>{props.title}</h1>
                        {props.content}
                        <div className="action-bar" >
                            {props.fermer &&
                                <Button onclick={toggleModal} contenu={"fermer"} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}