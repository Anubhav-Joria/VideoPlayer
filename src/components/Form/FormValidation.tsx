import { Button, Paper, Grid, TextField, Box, Typography } from "@mui/material";
import { Form, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userSchema } from "./Schema";
import axios from "axios";

type FormType = {
  editing?: boolean;
  add?: boolean;
  index: any;
  name: string;
  link: string;
  bucket: string;
  setDbAdded?: any;
};

const BASE_URL = "http://localhost:8000";

function FormValidation(props: FormType) {
  const navigate = useNavigate();
  const postCards = (values: any, index: number) => {
    if (index === -1) {
      axios
        .get(`${BASE_URL}/cards?name=${values.name}`)
        .then((res) => {
          if (res.data.length > 0) {
            console.log("already exist with this name");
          } else {
            axios
              .post(`${BASE_URL}/cards`, values)
              .then((res) => {
                console.log("postCArds");
              })
              .catch((e) => console.log("error in post cards"));
          }
        })
        .catch((e) => console.log("error in post cards"));
    }
  };

  const postCategories = (values: any, index: number) => {
    const category = values.bucket;
    let obj = {
      name: category,
    };

    if (index === -1) {
      console.log(`url= , ${BASE_URL}/categories?name=${values.name}`);
      axios
        .get(`${BASE_URL}/categories?name=${values.bucket}`)
        .then((res) => {
          console.log("cat res", res);
          if (res.data.length === 0) {
            axios
              .post(`${BASE_URL}/categories`, obj)
              .then((res) => {
                navigate("/");
              })
              .catch((e) => console.log("error in post categores"));
          } else {
            navigate("/");
          }
        })
        .catch((e) => console.log("error in post cards"));
    }
  };

  const Services = (values: any, index: any) => {
    postCards(values, index);
    postCategories(values, index);
  };

  const Formik = useFormik({
    initialValues: {
      name: props.name,
      link: props.link,
      bucket: props.bucket,
    },
    validationSchema: userSchema,

    onSubmit: (values, actions) => {
      if (props?.editing === true) {
        const obj = {
          values,
          index: props.index,
        };

        Services(obj.values, obj.index);
      }
      if (props?.add === true) {
        Services(values, -1);
      }

      actions.resetForm({
        values: {
          name: "",
          link: "",
          bucket: "",
        },
      });
    },
  });

  return (
    <>
      <Box
        // container={true}
        sx={{ boxShadow: 3, width: "40%", mx: "auto" }}
        // spacing={3}
        paddingX={5}
        paddingY={8}
        marginY={2}
      >
        {props.add ? (
          <Typography variant="h5" marginBottom={4}>
            Add Entries
          </Typography>
        ) : (
          <Typography variant="h5" marginBottom={4}>
            Edit Entries
          </Typography>
        )}

        <form onSubmit={Formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  name="name"
                  value={Formik.values.name}
                  label="Name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </Grid>
              <Grid>
                {Formik.errors.name && Formik.touched.name ? (
                  <Typography sx={{ color: "red" }}>
                    {Formik.errors.name}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  label="Link"
                  value={Formik.values.link}
                  name="link"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                {Formik.errors.link && Formik.touched.link ? (
                  <Typography sx={{ color: "red" }}>
                    {Formik.errors.link}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid>
                <TextField
                  label="Bucket"
                  value={Formik.values.bucket}
                  name="bucket"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                {Formik.errors.bucket && Formik.touched.bucket ? (
                  <Typography sx={{ color: "red" }}>
                    {" "}
                    {Formik.errors.bucket}{" "}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid marginY={3}>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
            :
          </Grid>
        </form>
        <Grid container></Grid>
      </Box>
    </>
  );
}

export default FormValidation;
