import { Typography, Button, Grid, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";
import { GetToken, RemoveToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../features/UserSlice";
import { unsetUserToken } from "../features/AuthSlice";

const DashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unsetUserToken({ token: null }));
    RemoveToken("token");
    navigate("/login");
  };
  const token = GetToken();
  const { data, isSuccess } = useGetLoggedUserQuery(token);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });
  //Store User data in local state
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
      });
    }
  }, [data, isSuccess]);
  // Store User Data in Redux Store
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);
  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>
          <Typography variant="h5">Email: {userData.email}</Typography>
          <Typography variant="h6">Name: {userData.name}</Typography>
          <Button
            variant="contained"
            color="warning"
            size="larger"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            LogOut
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default DashBoard;
