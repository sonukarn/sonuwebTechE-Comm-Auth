import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/UserAuthApi";
import { GetToken, StoreToken } from "../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/AuthSlice";

const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      const result = await loginUser(actualData);
      // console.log(typeof result.data.status);
      if (result.data.status === "Success") {
        StoreToken(result.data.token);
        // console.log(result.data.status);
        navigate("/dashboard");
      }
      if (result.data.status === "failed") {
        setError({
          status: true,
          msg: result.data.message,
          type: "error",
        });
      }
      // if (res.data.status === "success") {
      //   StoreToken(res.data.token);
      //   navigate("/dashboard");
      // }
      // if (res.data.status === "failed") {
      //   setError({
      //     status: true,
      //     msg: res.data.message,
      //     type: "error",
      //   });
      // }
    } else {
      setError({
        status: true,
        msg: "All Fields are Required",
        type: "error",
      });
    }
  };

  let token = GetToken();
  // console.log("login", token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserToken({
        token: token,
      })
    );
  }, [token, dispatch]);

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 2 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          autoFocus
        />
        <Box textAlign={"center"}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Login
            </Button>
          )}
        </Box>
        <NavLink to="/sendpasswordresetemail">Forgot password</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default UserLogin;
