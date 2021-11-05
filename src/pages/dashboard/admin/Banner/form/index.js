import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Checkbox, FormControlLabel, Grid, Snackbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiAlert from '@material-ui/lab/Alert';
import './index.css';
import { ADMIN_URLS } from '../../../../../_apis_/urls';

const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Form = (props) => {
  const [name, setName] = useState('');
  const [link, setlink] = useState('');
  const [newBannerImage, setnewBannerImage] = useState('');
  const [open, setopen] = useState(false);
  const [addBannerButtonDisabled, setaddBannerButtonDisabled] = useState(false);
  const [isMobileBanner, setisMobileBanner] = useState(false);

  const handleisMobileBanner = () => {
    setisMobileBanner({ isMobileBanner: !isMobileBanner });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen({ open: false });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLinkChange = (event) => {
    setlink(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (!newBannerImage) {
      return;
    }
    formData.append('image', newBannerImage);
    formData.append('name', name);
    formData.append('link', link);
    formData.append('isMobileBanner', isMobileBanner);

    await axios.post(`${API_ROOT}${ADMIN_URLS.admin_banner}`, formData, {
      headers: {
        Authorization: props.authorization
      }
    });

    props.getBanner();
    setName('');
    setlink('');
    setnewBannerImage(null);
    setaddBannerButtonDisabled(false);
    setopen(true);
    setisMobileBanner(false);

    document.getElementById('bannerImage').value = '';
  };

  const fileChangedHandler = (event) => {
    setnewBannerImage(event.target.files[0]);
  };

  if (props.addBannerButtonDisabled) {
    return (
      <div style={{ margin: '15px' }}>
        <h4>Add Banner feature disabled.</h4>
        <p>
          You have unsaved changes. Plese save them before adding new banner. Press <b>save</b> button (top right
          corner) to save changes and enable add banner functionality.
        </p>
        <hr />
      </div>
    );
  }
  return (
    <div>
      <div className="formlabel">
        <h5>Add a new banner</h5>
      </div>
      <form noValidate autoComplete="off" className="form-inline">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              helperText="e.g. 'Winter_Sale'"
              id="name"
              name="name"
              color="primary"
              label="Name"
              size="medium"
              className="textfield"
              variant="outlined"
              onChange={handleNameChange}
              value={name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ViewCarouselIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              helperText="http://www.example.com"
              id="link"
              name="link"
              color="primary"
              label="Link"
              variant="outlined"
              className="textfield"
              size="medium"
              onChange={handleLinkChange}
              value={link}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  //  required
                  checked={isMobileBanner}
                  onChange={handleisMobileBanner}
                  name="isMobileBanner"
                  value={isMobileBanner}
                  color="default"
                />
              }
              label="Make this a mobile banner"
            />
          </Grid>
          <Grid item xs={6}>
            <input
              name="image"
              className="inputfile"
              accept="image/*"
              type="file"
              id="bannerImage"
              onChange={fileChangedHandler}
            />
          </Grid>
          <Grid item xs={12} className="mt-3">
            <Button
              id="submitButton"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={handleSubmit}
              disabled={addBannerButtonDisabled}
            >
              Add Banner
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Banner uploaded, List will be update soon!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
