import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const addToCartHandler = () => {
    if (isLoggedIn) {
      dispatch(
        cartActions.addItemToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      );
    } else if (window.confirm("Please Login to add to Cart")) {
      navigate("/auth");
    }
  };
  const starRating = (num) => {
    const filledStar = Math.floor(num);
    let stars = [];
    for (let i = 0; i < filledStar; i++) {
      stars.push(<FontAwesomeIcon color="#fdd017" icon={faStar} key={i} />);
    }
    for (let i = filledStar; i < 5; i++) {
      if (Math.round(num) - filledStar > 0) {
        stars.push(
          <FontAwesomeIcon color="#fdd017" icon={faStarHalf} key={i} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon color="#fdd017" icon={faStarEmpty} key={i} />
        );
      }
    }
    return stars;
  };
  const discountPrice = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };
  return (
    <>
      {/* <Box sx={{ width: "100%" }}></Box> */}
      <Box sx={{ width: "100%", height: "100%" }}>
        <Card sx={{ padding: 3 }}>
          <CardMedia
            component="img"
            image={product.images[1]}
            alt={product.title}
            height="300"
            sx={{ objectFit: "contain" }}
          />
          <CardHeader title={product.title} subheader={product.brand} />
          <CardContent>
            <Typography variant="p">{product.description}</Typography>
            <br />
            <br />
            <Typography
              variant="subtitle2"
              sx={{ textTransform: "capitalize" }}
            >
              category: {product.category}
            </Typography>
            <br />

            <Typography variant="body1" component="span">
              {`Price:  `}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontStyle: "italic", textDecoration: "line-through" }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontStyle: "italic" }}
            >
              {`  $${discountPrice(
                product.price,
                product.discountPercentage
              )} (${product.discountPercentage}% discount)`}
            </Typography>
            <br />
            <br />

            <Typography variant="body1">
              {`Rating:  `}
              {starRating(product.rating)}
              {` (${product.rating})`}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant="body2" color="green">
              stock:{product.stock}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetail;
