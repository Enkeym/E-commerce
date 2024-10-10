import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../app/services/ordersApi";
import Layout from "../components/layout/Layout";
import Loader from "../components/loader/Loader";
import OrdersList from "../components/order/OrdersList";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { data, error, isLoading } = useGetOrdersQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders");
    }
  }, [error]);

  return (
    <Layout>
      <h1 className="my-4 text-center">Orders Management</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          {orders.length === 0 ? (
            <div className="text-center">
              <p className="my-4">No orders found!</p>
              <Button variant="primary" onClick={() => navigate('/products')}>
                Browse Products
              </Button>
            </div>
          ) : (
            <OrdersList data={orders} />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Orders;
