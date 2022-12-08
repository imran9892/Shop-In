import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Box height="95vh">
      <Stack
        justifyContent="center"
        alignItems="start"
        height={360}
        paddingLeft={10}
        sx={{
          backgroundImage: "linear-gradient(90deg,#111,#1338BE)",
        }}
      >
        <Typography
          component="h1"
          fontSize={56}
          color="#fff"
          fontWeight="medium"
        >
          Welcome to Shop-In
        </Typography>
      </Stack>
    </Box>
  );
};

export default HomePage;
