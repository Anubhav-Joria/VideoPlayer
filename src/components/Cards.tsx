import React from "react";
import { Stack, Box } from "@mui/material";
import CardItem from "./CardItem";

export interface CardsProps {
  handleFetchCategories: any;
  fetchCategoryData: any;
  cards: any;
}
const Cards = ({
  handleFetchCategories,
  fetchCategoryData,
  cards,
}: CardsProps) => {
  return (
    <Stack
      direction={"row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {cards.map((item: any) => (
        <Box key={item.id}>
          <CardItem
            handleFetchCategories={handleFetchCategories}
            fetchCategoryData={fetchCategoryData}
            card={item}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default Cards;
