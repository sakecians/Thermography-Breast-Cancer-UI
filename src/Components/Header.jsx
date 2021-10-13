import React from 'react';
import { Typewriter } from "react-simple-typewriter";
import { Button, Grid, Typography, Box } from "@mui/material";

export default function Header(props) {
    return (
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
              onClick={props.handleClickOpen}
              variant='contained'>
              Detect for free
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
}
