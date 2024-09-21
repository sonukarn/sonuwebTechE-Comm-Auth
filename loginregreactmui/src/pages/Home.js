import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
const Home = () => {
  //Getting User Data from Redux Store
  const myData = useSelector((state) => state.user);
  console.log("Home", myData);
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={10}>
          <h1>Home page {myData.name}</h1>
          <hr />
          <p>
            Home, ipsum dolor sit amet consectetur adipisicing elit. Sit, iste
            cumque deserunt nisi aperiam distinctio, quaerat molestias
            cupiditate, nostrum id quo velit! Quis repudiandae, fugiat minima
            doloremque neque natus voluptatibus temporibus libero laudantium
            voluptate? Impedit totam rerum a aliquid maxime mollitia aperiam
            illum quo tempora ex doloribus necessitatibus adipisci itaque non
            quod officia, placeat nesciunt ab nulla ipsam corrupti est enim?
            Illum sint modi, corrupti facilis debitis doloremque pariatur
            explicabo laboriosam velit quas quo saepe quos tempora ullam? Quam
            nihil, ducimus soluta ea cum sunt architecto sint minus rerum
            aliquam corporis a. Debitis, sit! Voluptatem, aliquid. Rem hic eaque
            illo.
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
