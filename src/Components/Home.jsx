import { Box } from '@mui/system';
import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Header from './Header';
import PredictPopup from './PredictPopup';
import About from './About';
import HowToUse from './HowToUse';


export default function Home() {
    const [open, setOpen] = React.useState(false);
    const [about, setAbout] = React.useState(false);
    const [howToUse, setHowToUse] = React.useState(false);

    const handleAboutOpen = () => {
      setAbout(true);
    }

    const handleHowToUseOpen = () => {
      setHowToUse(true);
    };

    const handleAboutClose = () => {
      setAbout(false);
    };

    const handleHowToUseClose = () => {
      setHowToUse(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
      <div class='container'>
        <Box pt={2} pr={8}>
          <Navbar
            handleAboutOpen={handleAboutOpen}
            handleHowToUseOpen={handleHowToUseOpen}
          />
        </Box>
        <Header handleClickOpen={handleClickOpen} />
        <PredictPopup handleClose={handleClose} open={open} />
        <About handleAboutClose={handleAboutClose} open={about} />
        <HowToUse handleHowToUseClose={handleHowToUseClose} open={howToUse} />
      </div>
    );
}
