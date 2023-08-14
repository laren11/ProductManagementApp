import React, { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

import { InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  selectMenu: {
    maxHeight: 200,
    overflowY: "auto",
  },
}));

const Signup = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailSnackbar, setEmailSnackbar] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { signup, error, isLoading, success } = useSignup();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    setSnackbarOpen(success);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, repeatPassword, name, surname);
    if (success) {
      setEmailSnackbar(email);
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      console.log("SUCCESS: ", success);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Surname:</label>
      <input value={surname} onChange={(e) => setSurname(e.target.value)} />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Repeat Password:</label>
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      <button disabled={isLoading}>Sign up</button>
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Already have an account?</div>
        <div>
          <Link to="/login">Log In Here!</Link>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          User {emailSnackbar} sucessfully added!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Signup;
