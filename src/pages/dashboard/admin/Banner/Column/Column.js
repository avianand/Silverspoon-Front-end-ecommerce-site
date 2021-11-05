import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Task from '../Task/Task';

const Title = styled.h3`
  padding: 4px;
  font-family: Helvetica;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'lightblue' : 'white')};
`;

const ContainerD = styled.div`
  margin: 8px;
  border-radius: 10px;
  width: 10px:
  box-shadow: 5px 10px 18px #888888 ;
 `;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(6)
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(6)
  },
  appbar: {
    borderRadius: 10
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Column(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSave = (event) => {
    props.refresh();
    props.disableAddBannerButton();
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // console.log("columns: ", props);
  return (
    <>
      <ContainerD>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Edit {props.column.title}
            </Typography>

            <IconButton style={{ outline: 'none', boxShadow: 'none' }} color="inherit">
              <RefreshIcon onClick={handleSave} style={{ marginRight: '25px' }} />
            </IconButton>
            <IconButton style={{ outline: 'none', boxShadow: 'none' }} color="inherit">
              <SaveIcon onClick={props.update} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {props.banners.map((banner, index) => (
                <Task
                  key={banner._id}
                  index={index}
                  banner={banner}
                  deleteBanner={props.deleteBanner}
                  disableAddBannerButton={props.disableAddBannerButton}
                />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ContainerD>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Banner data being refreshed. Please wait !
        </Alert>
      </Snackbar>
    </>
  );
}

export default Column;
