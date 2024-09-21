import React, { useState } from "react";
import { TextField, Grid, Button, Box, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/UserAuthApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { id, token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await resetPassword({ actualData, id, token });
        console.log(res);
        if (res.data.status === "success") {
          document.getElementById("password-reset-form").reset();
          setError({
            status: true,
            msg: "Password Reset Successfull. Redirecting to Login Page...",
            type: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        if (res.data.status === "failed") {
          setError({
            status: true,
            msg: res.data.message,
            type: "error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "Password And Confirm Password Does't Matched",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "All Fields are Required",
        type: "error",
      });
    }
  };
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            id="password-reset-form"
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="New Password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              label="New Confirm Password"
            />
            <Box textAlign={"center"}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Save
              </Button>
            </Box>

            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
