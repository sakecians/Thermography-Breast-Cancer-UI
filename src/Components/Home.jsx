import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import './Home.css';
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
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typewriter } from "react-simple-typewriter";

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [prediction, setPrediction] = useState(undefined);

    const onClickPop = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const onClosePop = () => {
      setAnchorEl(null);
    };

    const handlePredictions = () => {
      if(preview) {
        setPrediction(() => "It's normal don't worry :)");
      } else {
        setPrediction(() => "Please upload an image first");
      }
    };

    const openPop = Boolean(anchorEl);
    const id = openPop ? "simple-popover" : undefined;

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
        <Box
          m={8}
          mt={12}
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
            marginTop: "11rem",
          }}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
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
                <Typewriter
                  words={["OF BREAST CANCER"]}
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
                {"\n"}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "2.8rem",
                  lineHeight: "3rem",
                  color: "#333333",
                }}>
                USING{" "}
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "2.8rem",
                    color: "#333333",
                    fontWeight: 600,
                  }}>
                  <Typewriter
                    words={["SVM", "CNN"]}
                    loop={false}
                    cursor
                    cursorStyle='_'
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size='large'
                style={{
                  fontFamily: "Lato, sans-serif",
                  backgroundColor: "#333",
                }}
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
            style={{ backgroundColor: "#E15E82", color: '#fbfbfb' }}
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
            <Box m={2} />
            {prediction ? (
              <Grid container justifyContent='center'>
                <Typography>{prediction}</Typography>
              </Grid>
            ) : undefined}
          </DialogContent>
          <DialogActions>
            <Button style={{color: '#333333', borderColor: '#333333'}} variant="outlined" autoFocus onClick={onClickPop}>
              Predict
            </Button>
            <Popover
              id={id}
              open={openPop}
              anchorEl={anchorEl}
              onClose={onClosePop}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}>
              <nav aria-label='secondary mailbox folders'>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText onClick={handlePredictions} primary='CNN' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component='a' href='#simple-list'>
                      <ListItemText onClick={handlePredictions} primary='SVM' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Popover>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
}
