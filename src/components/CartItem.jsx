import {
  AddShoppingCart,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(item));
  };
  const removeFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          height="40px"
          image={item.thumbnail}
          alt={item.title}
          sx={{ width: "30px", paddingLeft: 1 }}
        />
        <CardHeader
          title={
            item.title.length >= 9
              ? item.title.substr(0, 9) + "..."
              : item.title
          }
          subheader={"$" + item.price}
          titleTypographyProps={{ fontSize: "medium" }}
          subheaderTypographyProps={{ fontSize: "small", fontStyle: "italic" }}
        />
      </Box>
      <CardActions disableSpacing={true}>
        <Paper square={true} variant="outlined" sx={{ textAlign: "center" }}>
          <IconButton
            sx={{ marginRight: "2px" }}
            onClick={removeFromCartHandler}
          >
            <RemoveShoppingCartOutlined color="error" fontSize="small" />
          </IconButton>
          {"x" + item.quantity}
          <IconButton sx={{ marginLeft: "2px" }} onClick={addToCartHandler}>
            <AddShoppingCart color="success" fontSize="small" />
          </IconButton>
        </Paper>
      </CardActions>
    </Card>
  );
};

export default CartItem;
