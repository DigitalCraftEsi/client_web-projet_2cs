import * as React from 'react';
import Switch from '@mui/material/Switch';
import { FaEllipsisV, FaTrashAlt, FaPen } from "react-icons/fa"

import "./Card.css"

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'




const theme = createTheme({
    palette: {
        primary: {
            main: '#3c3c3c', // replace with your desired color
        },
    },
});



const Card = (props) => {

    const [open, setOpen] = React.useState(false);
    const [visible, setVisibility] = React.useState(props.data.visible == 1 ? true : false);
    const anchorRef = React.useRef(null);
    const { id } = useParams();

    React.useEffect(() => {
        console.log(props.data)
    }, [])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    function handleDelete() {
        props.deleteFun(props.data.id);
        handleClose();
    }

    function handleVisibility(event) {
        event.stopPropagation();
        setVisibility(!visible);
    }


    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);



    const data = props.data;

    if (!data.video) {
        return (
            <div>
                image is loading
            </div>
        )
    }

    const images = require.context('../../assets/Annonces/', true);
    const loadImage = imageName => (images(`./${imageName}`));

    return (
        <>
            <ThemeProvider theme={theme}>
                <Link to={`${id}`}><div className={visible ? "opacity-100" : "opacity-60"}>
                    <div className={'sup'} >
                        <div className="tools">
                            <div>
                                <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <FaEllipsisV />
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleDelete}> <FaTrashAlt className='mr-1' /> Delete</MenuItem>
                                                        <MenuItem onClick={handleClose}> <FaPen className='mr-1' /> Edit</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                            <p>Visible {visible ? <Switch onClick={handleVisibility} defaultChecked /> : <Switch onClick={handleVisibility} />} </p>
                        </div>
                        <div className="img-dv" >
                            <img className="img-pr"
                                src={loadImage(data.video)} />
                        </div>
                    </div>
                </div></Link>
            </ThemeProvider>
        </>
    )
}

export default Card;