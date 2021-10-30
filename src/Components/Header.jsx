import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button, Grid, Typography, Box } from "@mui/material";

export default function Header(props) {
  return (
    <Box
      m={8}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "11rem",
        textAlign: "center",
      }}>
      <Grid container direction='column' alignItems='center' spacing={3}>
        <Grid item>
          <Typography
            align='center'
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "2rem",
              lineHeight: "3rem",
              textTransform: "uppercase",
              color: "#333333",
              letterSpacing: "8px",
            }}>
            <span
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                color: "#333333",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}>
              Thermal Image Processing
            </span>{" "}
            <br />
            <Typewriter
              words={["Anomaly Prediction Based upon color"]}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Typography>
          <br />
          <Typography
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "2rem",
              lineHeight: "3rem",
              color: "#333333",
              textAlign: "center",
            }}>
            USING{" "}
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "2rem",
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
            onClick={props.handleClickOpen}
            variant='contained'>
            Detect for free
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
