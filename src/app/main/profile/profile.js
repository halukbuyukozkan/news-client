import { Paper } from "@material-ui/core";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { use } from "i18next";
import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateUser,
} from "src/app/services/userService/userService";

export default function UserUpdate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUserData(user.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, userData.id)
      .then((data) => {
        console.log("User updated:", data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="m-40">
      <Paper>
        <form onSubmit={handleSubmit} className="p-40">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Update Your Profile</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
