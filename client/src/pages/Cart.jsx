import { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCartQuery } from "../app/services/cartApi";
import QuantitySelector from "../components/cart/QuantitySelector";
import RemoveFromCart from "../components/cart/RemoveFromCart";
import Layout from "../components/layout/Layout";
import Loader from "../components/loader/Loader";
import AddOrder from "../components/order/AddOrder";

const Cart = () => {
  const { data: cartItems, isLoading, isError } = useGetCartQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load cart");
    }
  }, [isError]);

  if (isLoading) {
    return <Loader />;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Layout>
        <h1 className="my-4">Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Button variant="primary" className="mt-3" onClick={() => navigate('/products')}>
          Go to Products
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-4">
        <h1 className="my-4 text-center">Shopping Cart</h1>
        <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.productId}
                className="d-flex justify-content-between align-items-center gap-3"
              >
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <h5>{item.product.name}</h5>
                    <p className="fw-bold">Price: ${item.total.toFixed(2)}</p>
                  </div>
                  <QuantitySelector productId={item.productId} className="me-3" />
                </div>
                <RemoveFromCart productId={item.productId} />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row className="py-3">
            <Col className="text-center">
              <AddOrder />
            </Col>
          </Row>
        </Card>
      </Container>
    </Layout>
  );
};

export default Cart;
