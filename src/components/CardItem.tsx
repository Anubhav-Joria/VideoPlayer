import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  margin: "auto",
  p: 4,
};
interface CardItemProp {
  handleFetchCategories: any;
  fetchCategoryData: any;
  card: any;
}

const CardItem = ({
  handleFetchCategories,
  fetchCategoryData,
  card,
}: CardItemProp) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const playVideo = () => {
    setOpen(true);
  };

  const deleteCard = (index: number) => {
    const url = `http://localhost:8000/cards/${index}`;
    axios
      .delete(url)
      .then(() => {
        console.log("sucessfully deleted");
        fetchCategoryData();
        handleFetchCategories();
      })
      .catch(() => console.log("error"));
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div">
          {card?.name}
        </Typography>

        <CardActions>
          <Grid container>
            <Grid item xs={12}>
              <Button size="small" onClick={handleOpen}>
                Play Video
              </Button>
            </Grid>

            {/* <Grid item xs={12} mt={1}> */}
            <Grid item xs={6} mt={2}>
              <Button size="small">Edit</Button>
            </Grid>
            <Grid item xs={6} mt={2}>
              <Button
                size="small"
                onClick={() => {
                  deleteCard(card?.id);
                }}
              >
                Delete
              </Button>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Playing Video
          </Typography>

          <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Box>
      </Modal>
    </>
  );
};

export default CardItem;
