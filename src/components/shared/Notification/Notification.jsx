import React, {useState, useEffect} from "react";
import {Snackbar,} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {hideNote} from "../../../store/notificationReducer";


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
};

const Notification = ({type, msg, hideNote}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
        msg && setOpen(true);
    }, [msg]);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            {(msg && type) &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {msg}
                </Alert>
            </Snackbar>
            }
        </>

    );
};


export default Notification;
