import { Button, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../../../app/services/api';
import { useRemoveOrdersMutation } from '../../../app/services/ordersApi';
import { removeOrder, setSelectedOrder } from '../../../features/ordersSlice';
import styles from './OrdersList.module.css';

const OrdersList = ({ data: orders }) => {
  const [deleteOrder] = useRemoveOrdersMutation();
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);
  const dispatch = useDispatch();

  const handleSelectOrder = (order) => {
    dispatch(setSelectedOrder(order));
  };

  const handleDeleteOrder = async (orderId, e) => {
    e.stopPropagation();
    try {
      await deleteOrder(orderId).unwrap();
      dispatch(removeOrder({ id: orderId }));
    } catch (err) {
      console.error('Failed to delete the order:', err);
    }
  };

  return (
    <ListGroup>
      {orders.map(({ id: orderId, productsInOrder }) => (
        <ListGroup.Item
          key={orderId}
          onClick={() => handleSelectOrder({ id: orderId, productsInOrder })}
          className={`${styles.orderItem} ${selectedOrder?.id === orderId ? styles.orderItemSelected : ''}`}
        >
          <div className={styles.orderDetails}>
            {productsInOrder.map(({ id: productId, product, quantity, total }) => {
              const { title, image } = product;
              return (
                <div key={productId} className={styles.productInfo}>
                  <Image src={`${apiUrl}${image}`} alt={title} className={styles.productImage} rounded />
                  <div>
                    <div className={styles.productTitle}>Product: {title}</div>
                    <div>Quantity: {quantity}</div>
                    <div>Total: ${parseFloat(total).toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="danger" onClick={(e) => handleDeleteOrder(orderId, e)}>
            Cancel
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default OrdersList;
