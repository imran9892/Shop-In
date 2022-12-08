import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getProducts } from "../util/productApi";

const ShopPage = () => {
  const loaderData = useLoaderData();

  return (
    <Box padding={5}>
      <Typography variant="h3">Our Products</Typography>
      <Stack
        justifyContent={{ xs: "center", sm: "space-evenly" }}
        alignItems="center"
        columnGap={2}
        rowGap={5}
        marginY={5}
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
      >
        <Suspense fallback={<CircularProgress />}>
          <Await
            resolve={loaderData.products}
            errorElement={<p>Error loading blog posts.</p>}
          >
            {(loadedProducts) =>
              loadedProducts.map((product) => (
                <ProductList product={product} key={product.id} />
              ))
            }
          </Await>
        </Suspense>
      </Stack>
    </Box>
  );
};

export default ShopPage;

export async function loader() {
  return defer({ products: getProducts() });
}
