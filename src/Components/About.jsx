import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function About(props) {
    return (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleAboutClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{"About"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum temporibus minus magni ex. Eligendi hic odit ut dolorem, quaerat totam, eum ducimus sapiente animi laboriosam numquam, quis quia saepe tempora.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAboutClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
}
