import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";

export const App = (): JSX.Element => (
  <>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MasterMind Alpha
        </Typography>
        <IconButton component={RouterLink} to="/" color="inherit">
          <HomeRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xs" sx={{ pb: 3 }}>
      <Outlet />
    </Container>
  </>
);
