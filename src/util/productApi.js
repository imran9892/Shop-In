export const getProducts = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_DATABASE}/products.json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  const products = [];
  for (const key in data) {
    const id = key;
    products.push({ id, ...data[key] });
  }
  return products;
};

export const getProductDetail = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DATABASE}/products/${productId}.json`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
