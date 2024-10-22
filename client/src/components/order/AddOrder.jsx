import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddOrdersMutation } from "../../app/services/ordersApi";
import { clearCart, setCartError, setCartStatus } from "../../features/cartSlice";
import { addOrder } from "../../features/ordersSlice"; // Импортируем действие для добавления заказа
import Loader from "../loader/Loader";

const AddOrder = () => {
  const [addOrders, { isLoading, error }] = useAddOrdersMutation();
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (cartItems.length > 0 && userInfo) {
      const newOrder = {
        productsInOrder: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          total: item.total,
        })),
        userId: userInfo.id,
        status: "Pending",
      };
      setOrderDetails(newOrder);
    }
  }, [cartItems, userInfo]);

  const orderSubmit = async () => {
    if (orderDetails) {
      dispatch(setCartStatus("loading"));
      try {
        const newOrder = await addOrders(orderDetails).unwrap();
        dispatch(addOrder(newOrder));
        dispatch(setCartStatus("success"));
        dispatch(clearCart());
        navigate("/orders");
      } catch (err) {
        dispatch(setCartStatus("failed"));
        dispatch(setCartError(err?.data?.message || "Failed to add order"));
      }
    } else {
      dispatch(setCartError("Order details are missing"));
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <Alert variant="danger">
          {error?.data?.message || "An error occurred while processing the order"}
        </Alert>
      )}
      <Button
        variant="primary"
        onClick={orderSubmit}
        className="w-100"
        disabled={isLoading || cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default AddOrder;
