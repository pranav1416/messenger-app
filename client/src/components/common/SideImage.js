import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/bg-img.png";
import bubbleIcon from "../../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85),rgb(134,185,255,0.85)),url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  bgText: {
    flexDirection: "column",
    color: "white",
    textAlign: "center"
  }
}));

const SideImage = () => {
  const classes = useStyles();
  return (
    <Grid item sm={4} md={5} className={classes.bgContainer}>
      <Box display={{ xs: "none", sm: "block", md: "block" }}>
        <img src={bubbleIcon} alt='converse anywhere' />
      </Box>
      <Box
        component='span'
        display={{ xs: "none", sm: "block", md: "block" }}
        m={1}
      />
      <Box
        component='grid'
        display={{ xs: "none", sm: "flex", md: "flex" }}
        className={classes.bgText}
      >
        <Typography component='h4' variant='h4'>
          Converse with anyone
        </Typography>
        <Typography component='h4' variant='h4'>
          with any language
        </Typography>
      </Box>
    </Grid>
  );
};

export default SideImage;
