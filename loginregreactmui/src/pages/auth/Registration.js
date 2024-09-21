import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/UserAuthApi";
import { StoreToken } from "../../services/LocalStorageService";

const Registration = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      tc: data.get("tc"),
    };
    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await registerUser(actualData);
        // console.log(res);
        // document.getElementById("registration-form").reset();
        // setError({
        //   status: true,
        //   msg: "Registration Successful",
        //   type: "success",
        // });
        if (res.data.status === "success") {
          StoreToken(res.data.token);
          navigate("/dashboard");
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
          msg: "Password and Confirm password does not matched",
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
      <Box
        component="form"
        noValidate
        sx={{}}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          name="name"
          label="Name"
          autoFocus
        />
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

        <TextField
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label="Confirm Password"
          autoFocus
        />
        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
          label="I agree to term and condition."
        />
        <Box textAlign={"center"}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 4 }}
          >
            Join
          </Button>
        </Box>

        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default Registration;
