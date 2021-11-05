import React, { memo, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Form from './form';
import Column from './Column/Column';

import { ADMIN_URLS } from '../../../../_apis_/urls';

const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Banner = () => {
  const [banners, setbanners] = useState([]);
  const [newBanner, setnewBanner] = useState(null);
  const [addBannerButtonDisabled, setaddBannerButtonDisabled] = useState(false);
  const [authorizationToken, setauthorizationToken] = useState(null);
  const [formData, setformData] = useState({ name: '', link: '' });
  const [columns, setcolumns] = useState([{ id: '1', title: 'Banners' }]);
  // state = {
  //   banners: [],
  //   columns: [{ id: '1', title: 'Banners' }],
  //   newbanner: null,
  //   formData: { name: '', link: '' },
  //   addBannerButtonDisabled: false,
  //   authorizationToken: null
  // };

  const getAuthorization = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      await setauthorizationToken(token);

      return true;
    }

    return false;
  };

  const disableAddBannerButton = () => {
    setaddBannerButtonDisabled(true);
  };

  const fileChangedHandler = (event) => {
    setnewBanner(event.target.files[0]);
  };

  const getBanner = async () => {
    try {
      const response = await axios.get(`${API_ROOT}${ADMIN_URLS.admin_banner}`, {
        headers: {
          Authorization: 'NO_TOKEN'
        }
      });
      if (response.data.Error) {
        return [];
      }

      setbanners(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshBanner = async (event) => {
    setbanners([]);
    getBanner();
    setaddBannerButtonDisabled(false);
  };

  const updateBanner = async (event) => {
    console.log('invoked');
    try {
      const response = await axios.put(`${API_ROOT}${ADMIN_URLS.admin_banner}`, banners, {
        headers: {
          Authorization: authorizationToken
        }
      });
      setaddBannerButtonDisabled(false);
      if (response.data.Error) {
        return [];
      }
      getBanner();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBanner();
    getAuthorization();
  }, []);

  const deleteBanner = async (id) => {
    const bannerIndex = banners.findIndex((banner) => banner._id === id);
    const newArray = [...banners];
    newArray[bannerIndex] = {
      ...newArray[bannerIndex],
      isDeleted: !newArray[bannerIndex].isDeleted
    };
    await setbanners(newArray);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newBannersArray = Array.from(banners);

    const sourceItem = newBannersArray.splice(source.index, 1);
    newBannersArray.splice(destination.index, 0, sourceItem[0]);

    setbanners(newBannersArray);
  };

  return (
    <Grid container>
      <Grid item xs={10}>
        <Container>
          <Card>
            <CardContent>
              <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    banners={banners}
                    update={updateBanner}
                    refresh={refreshBanner}
                    deleteBanner={deleteBanner}
                    disableAddBannerButton={disableAddBannerButton}
                  />
                ))}
              </DragDropContext>
              <Form
                getBanner={getBanner}
                authorization={authorizationToken}
                addBannerButtonDisabled={addBannerButtonDisabled}
              />
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Banner;
