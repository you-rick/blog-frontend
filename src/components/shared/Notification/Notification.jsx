import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { hideNote } from '../../../store/notificationReducer';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Notification = ({ type, msg, hideNote }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    msg && setOpen(true);
  }, [msg]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hideNote();
    setOpen(false);
  };

  return (
    <>
      {(msg && type)
      && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type}>
            {msg}
          </Alert>
        </Snackbar>
      )}
    </>

  );
};

export default connect(null, { hideNote })(Notification);
