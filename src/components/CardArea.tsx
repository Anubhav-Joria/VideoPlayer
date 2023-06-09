import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Cards from "./Cards";

const CardArea = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [categories, setCategories] = useState<string[]>([]);
  const [cards, setCards] = useState<any>(null);

  const BASE_URL = "http://localhost:8000";
  const handleFetchCategories = async () => {
    let allCategories: string[] = [];
    let url = `${BASE_URL}/categories`;
    let data = await fetch(url);
    let parsedData = await data.json();

    parsedData.forEach((element: any) => {
      allCategories.push(element.name);
    });
    setCategories(allCategories);
  };

  const fetchAllCards = async () => {
    let url = `${BASE_URL}/cards`;
    const cardsData = await fetch(url);
    const jsonData = await cardsData.json();
    setCards(jsonData);
  };

  const fetchCategoryData = async () => {
    let url = `${BASE_URL}/cards`;
    if (selectedCategory !== "All Items") {
      url = `${url}?category=${selectedCategory}`;
    }
    const data = await fetch(url);
    const parsedData = await data.json();
    setCards(parsedData);
  };

  useEffect(() => {
    handleFetchCategories();
    fetchAllCards();
  }, []);

  useEffect(() => {
    handleFetchCategories();
    fetchCategoryData();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          width: { md: "15%" },
        }}
      >
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color={"#FC1503"}>
          {selectedCategory}
        </Typography>
        <Cards
          handleFetchCategories={handleFetchCategories}
          fetchCategoryData={fetchCategoryData}
          cards={cards}
        />
      </Box>
    </Stack>
  );
};

export default CardArea;
