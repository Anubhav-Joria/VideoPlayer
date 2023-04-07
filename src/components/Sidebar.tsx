import React from "react";
import { Stack, Typography } from "@mui/material";

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
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        mt: { sx: 0, md: 3 },
        flexDirection: { md: "column" },
      }}
    >
      <button
        className="category-btn"
        onClick={() => setSelectedCategory("All Items")}
        style={{
          background:
            "All Items" === selectedCategory ? "#1976d2" : "transparent",
          color: "All Items" === selectedCategory ? "white" : "#1976d2",
        }}
      >
        <Typography>All Items</Typography>
      </button>
      {categories.map((category: any) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category)}
          style={{
            background:
              category === selectedCategory ? "#1976d2" : "transparent",
            color: category === selectedCategory ? "white" : "#1976d2",
          }}
          key={category.name}
        >
          <Typography>{category}</Typography>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
