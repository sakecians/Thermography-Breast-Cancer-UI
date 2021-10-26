import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import upload_img from "./upload.jpg";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Grid, Typography, Box } from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ColorExtractor } from "react-color-extractor";

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

export default function PredictPopup(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [prediction, setPrediction] = useState(undefined);

  const [upImg, setUpImg] = useState();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 4 / 4 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [colors, setColors] = useState([]);
  const colorGetter = (newColors) => setColors([...newColors]);
  const [result, setResult] = useState();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!completedCrop) {
      return;
    }
    async function getCropped() {
      try {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setResult(base64Image);
      } catch (e) {
        console.log("crop the image");
      }
    }

    getCropped();
  }, [image, result, completedCrop, crop]);

  const onClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePop = () => {
    setAnchorEl(null);
  };

  const handlePredictions = () => {
    if (upImg) {
      setPrediction(() => "It's normal don't worry :)");
    } else {
      setPrediction(() => "Please upload an image first");
    }
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby='customized-dialog-title'
      fullWidth
      maxWidth='lg'
      open={props.open}>
      <BootstrapDialogTitle
        style={{ backgroundColor: "#E15E82", color: "#fbfbfb" }}
        id='customized-dialog-title'
        onClose={props.handleClose}>
        Thermography of breast anomaly
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent='center'>
          {upImg ? (
            <>
              <Grid item md={6}>
                <ReactCrop
                  style={{ width: "100%", height: "auto" }}
                  src={upImg}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              </Grid>
              <Grid item md={6} container justifyContent='center'>
                <ColorExtractor getColors={colorGetter}>
                  <img
                    alt='thermo'
                    src={result}
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0),
                    }}
                  />
                </ColorExtractor>
              </Grid>
            </>
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
        <Box m={1} />
        <Grid container justifyContent='center'>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            }}>
            {colors.map((color, id) => {
              return (
                <div
                  key={id}
                  style={{
                    backgroundColor: color,
                    width: 100,
                    height: 100,
                  }}
                />
              );
            })}
          </div>
        </Grid>
        <Box m={2} />
        {prediction ? (
          <Grid container justifyContent='center'>
            <Typography>{prediction}</Typography>
          </Grid>
        ) : undefined}
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: "#333333", borderColor: "#333333" }}
          variant='outlined'
          autoFocus
          onClick={onClickPop}>
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
  );
}
