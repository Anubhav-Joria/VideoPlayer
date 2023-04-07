import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type FormType = {
  editing?: boolean;
  add?: boolean;
};

const BASE_URL = "http://localhost:8000";

function Form(props: FormType) {
  const [name, setName] = useState<any>("");
  const [link, setLink] = useState<any>("");
  const [category, setCategory] = useState<any>("");

  const location = window.location;
  const ind = location.pathname.lastIndexOf("/");
  const id = location.pathname.substring(ind + 1);

  const fetchCardDetails = async () => {
    let url = `${BASE_URL}/cards/${id}`;
    const cardsData = await fetch(url);
    const jsonData = await cardsData.json();
    setName(jsonData.name);
    setLink(jsonData.link);
    setCategory(jsonData.category);
  };

  useEffect(() => {
    fetchCardDetails();
  }, [location]);

  const navigate = useNavigate();
  const postCards = async (values: any, index: number) => {
    if (index === -1) {
      axios
        .get(`${BASE_URL}/cards?name=${values.name}`)
        .then((res) => {
          if (res.data.length > 0) {
            alert("Already exist with this name");
          } else {
            axios
              .post(`${BASE_URL}/cards`, values)
              .then(() => {
                console.log("postCArds");
              })
              .catch(() => console.log("error in post cards"));
          }
        })
        .catch(() => console.log("error in post cards"));
    } else {
      const cardName = await axios.get(`${BASE_URL}/cards?name=${values.name}`);
      if (cardName.data.length > 0) {
        alert("card with this name already exist");
        return;
      }

      axios
        .put(`${BASE_URL}/cards/${id}`, values)
        .then((res) => {
          navigate("/");
        })
        .catch(() => console.log("error in post cards"));
    }
  };

  const postCategories = (values: any) => {
    let obj = {
      name: values.category,
    };
    axios
      .get(`${BASE_URL}/categories?name=${values.category}`)
      .then((res) => {
        if (res.data.length === 0) {
          axios
            .post(`${BASE_URL}/categories`, obj)
            .then(() => {
              navigate("/");
            })
            .catch(() => console.log("error in post categores"));
        } else {
          navigate("/");
        }
      })
      .catch(() => console.log("error in post cards"));
  };

  const Services = (values: any, index: any) => {
    postCards(values, index);
    setTimeout(() => {
      postCategories(values);
    }, 200);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const values = {
      name: name,
      link: link,
      category: category,
    };
    if (props?.add === true) {
      Services(values, -1);
    }
    if (props?.editing === true) {
      Services(values, id);
    }
  };

  return (
    <>
      <Box
        sx={{ boxShadow: 3, width: "40%", mx: "auto" }}
        paddingX={5}
        paddingY={8}
        marginY={2}
      >
        {props.add ? (
          <Typography variant="h5" marginBottom={4}>
            Add Video
          </Typography>
        ) : (
          <Typography variant="h5" marginBottom={4}>
            Edit Video
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  value={name}
                  label={props.add ? "Video Name" : ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  label={props.add ? "Video Link" : ""}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid>
                <TextField
                  label={props.add ? "Video Category" : ""}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid marginY={3}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
