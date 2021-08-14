import {
  Grid,
  makeStyles,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Button,
  TextField,
} from "@material-ui/core";
import { Input } from "@material-ui/icons";
import React, { useState } from "react";

export default function Test() {
  const [hover, setHover] = useState(1);

  const useStyle = makeStyles((theme) => ({
    paper: {
      height: 140,
      width: 100,
    },
    grid: {
      height: "100vh",
      width: "100wh",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  const classes = useStyle();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography style={{ flexGrow: "1" }} variant="h6">
            hi
          </Typography>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <Button variant="contained" color="secondary">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Input variant="secondary" />
      <Grid
        className={classes.grid}
        container
        spacing={5}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Paper className={classes.paper} />
        </Grid>
        <Grid item>
          <Paper elevation={hover} className={classes.paper} />
        </Grid>
        <Grid item>
          <Paper className={classes.paper} />
        </Grid>
      </Grid>
    </>
  );
}
