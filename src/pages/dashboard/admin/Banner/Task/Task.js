import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Button, Snackbar, Fade, Modal, Backdrop, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import MuiAlert from '@material-ui/lab/Alert';
import Image from '../image';

const ContainerD = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? '#68BBE3' : 'white')};
  display: flex;

  justify-content: space-between;
`;
const HandleImage = styled.div`
  flex-grow: 1;
`;
const HandleDetails = styled.div`
  margin-top: 1.5rem;
  flex-grow: 1;
  width: 10%;
`;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Task(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const deleteThisBanner = () => {
    props.deleteBanner(props.banner._id);

    setOpen(true);
    setIsDisabled(true);
    props.disableAddBannerButton();
  };

  return (
    <>
      <Draggable draggableId={props.banner.position.toString()} index={props.index}>
        {(provided, snapshot) => (
          <ContainerD
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <HandleImage>
              <Image image={props.banner} />
            </HandleImage>
            <HandleDetails>
              <b>Name :</b> {props.banner.name} <br />
              <b>Link : </b>
              <a href={`${props.banner.link}`}>{props.banner.link}</a>
              <br />
              <Typography>
                <b>Mobile Banner:</b> {props.banner.isMobileBanner ? 'Yes' : 'No'}
              </Typography>
              <br />
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={deleteThisBanner}
                disabled={isDisabled}
                size="small"
              >
                Delete
              </Button>
            </HandleDetails>
          </ContainerD>
        )}
      </Draggable>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Banner will be deleted, Press Save to confirm!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Task;
