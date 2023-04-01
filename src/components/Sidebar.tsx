import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface CategoriesProps {
  categories: any;
  selectedCategory: any;
  setSelectedCategory: any;
}
const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  console.log("categories", categories);
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      <Typography variant="h4" my={3}>
        Categories
      </Typography>
      {categories.map((category: any, index: number) => (
        <Box sx={{ margin: 1 }} key={index}>
          <Button
            className="category-btn"
            onClick={() => setSelectedCategory(category)}
            variant={category === selectedCategory ? "contained" : "outlined"}
          >
            {category}
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

export default Categories;
