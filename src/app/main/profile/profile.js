import { Paper } from "@material-ui/core";
import {
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { use } from "i18next";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { getPreferences } from "src/app/services/preferenceService/preferenceService";
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
  const [preferenceData, setPreferences] = useState([]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUserData(user.user);
        setFormData({
          name: user.user.name,
          email: user.user.email,
        });
      })

      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    getPreferences()
      .then((preference) => {
        setPreferences(preference);
      })
      .catch((error) => {
        console.error("Error fetching preferences:", error);
      });
  }, []);

  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelectedPreferences(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, userData.id, selectedPreferences)
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
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedPreferences}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Name" />}
              >
                {preferenceData.map((preference) => (
                  <MenuItem key={preference.id} value={preference.id}>
                    {preference.name}
                  </MenuItem>
                ))}
              </Select>
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
