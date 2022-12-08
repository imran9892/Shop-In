import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";

const ProductList = ({ product }) => {
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

  const productDetailHandler = () => {
    navigate(`${product.id}`);
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

  return (
    <Card sx={{ width: "260px" }}>
      <CardActionArea onClick={productDetailHandler}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          height={194}
          alt={product.title}
          sx={{ objectFit: "contain" }}
        />
        <CardHeader
          titleTypographyProps={{
            fontSize: 21,
            noWrap: true,
            title: product.title,
          }}
          title={
            product.title.length >= 17
              ? product.title.substr(0, 17) + "..."
              : product.title
          }
          subheader={product.brand}
        />
        <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="span">${product.price}</Typography>
            <Typography variant="span">
              {starRating(product.rating)}
              {product.rating}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          fullWidth={true}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#212121",
            "&:hover": { backgroundColor: "#616161" },
          }}
          onClick={addToCartHandler}
        >
          <ShoppingCartIcon fontSize="small" sx={{ marginRight: 1 }} />
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductList;
