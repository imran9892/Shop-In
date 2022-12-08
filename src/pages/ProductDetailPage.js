import { CircularProgress, Stack } from "@mui/material";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { getProductDetail } from "../util/productApi";

const ProductDetailPage = () => {
  const productDetailResponse = useLoaderData();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      // direction="column"
      sx={{ padding: 3 }}
    >
      <Suspense fallback={<CircularProgress />}>
        <Await
          resolve={productDetailResponse.product}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedProduct) => <ProductDetail product={loadedProduct} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default ProductDetailPage;

export async function loader({ params }) {
  const { productId } = params;
  return defer({ product: getProductDetail(productId) });
}
