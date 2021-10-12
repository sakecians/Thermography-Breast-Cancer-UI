import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import './Home.scss';
import Navbar from './Navbar';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { GrClose } from 'react-icons/gr';
import upload_img from './upload.jpg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <GrClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Home() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
      if (!selectedFile) {
        setPreview(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0]);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
      <div class='container'>
        <Box pt={2} pr={8}>
          <Navbar />
        </Box>
        <Box m={8} mt={12} style={{ width: "500px" }}>
          <Grid container direction='column' spacing={3}>
            <Grid item md={4}>
              <Typography
                style={{
                  fontSize: "2.8rem",
                  lineHeight: "3rem",
                  color: "#333333",
                  letterSpacing: "8px",
                }}>
                <span
                  style={{
                    fontSize: "4rem",
                    fontWeight: 800,
                    color: "#333333",
                    letterSpacing: "5px",
                  }}>
                  THERMOGRAPHY
                </span>{" "}
                OF BREAST CANCER
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography style={{ fontSize: "1rem", color: "#333333" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                facere dicta fugit provident perferendis explicabo vitae
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Button
                style={{ background: "#E15E82", borderRadius: "200px" }}
                onClick={handleClickOpen}
                variant='contained'>
                Detect for free
              </Button>
            </Grid>
          </Grid>
        </Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}>
          <BootstrapDialogTitle
            id='customized-dialog-title'
            onClose={handleClose}>
            Thermography of breast anomaly
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Grid container justifyContent='center'>
              {selectedFile ? (
                <img
                  style={{ width: "500px", height: "auto" }}
                  alt='img-upload'
                  src={preview}
                />
              ) : (
                <img
                  style={{ width: "500px", height: "auto" }}
                  alt='img-upload'
                  src={upload_img}
                />
              )}
            </Grid>
            <Box m={2} />
            <Grid container justifyContent='center'>
              <Button
                style={{ background: "#E15E82" }}
                variant='contained'
                component='label'>
                Upload File
                <input type='file' onChange={onSelectFile} hidden />
              </Button>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Predict
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
}
