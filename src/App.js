import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/login";
import HomePage from "./pages/HomePage/homepage";
import { createTheme, ThemeProvider } from "@mui/material";
import Error from "./components/Modals/Error/Error";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#300D38",
    },
    secondary: {
      main: "#FBA919",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif cursive",
  },
});

function App() {
  const [appState, setAppState] = useState({
    isAuth: false,
    firstVisit: false,
    error: false,
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {appState.error && (
          <Error appState={appState} setAppState={setAppState}></Error>
        )}
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                appState.isAuth ? (
                  <HomePage appState={appState} setAppState={setAppState} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            <Route
              path="/login"
              element={
                !appState.isAuth ? (
                  <Login setAppState={setAppState} />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
