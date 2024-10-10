import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../app/services/api';
import Paginator from '../pagination/Paginator';

// Компонент для отображения списка продуктов
const MainProduct = ({ data }) => {
  const { currentPageProducts, totalPages } = data;

  // Если продуктов нет, отображаем сообщение
  if (!currentPageProducts || currentPageProducts.length === 0) {
    return (
      <Container className='d-flex justify-content-center align-items-center mt-5' style={{ color: 'red' }}>
        <h2>Product not found or add your first product!</h2>
      </Container>
    );
  }

  return (
    <>
      <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
        {currentPageProducts?.map((items) => {
          const { id, title, image, description, price } = items;
          return (
            <Link to={`/products/${id}`} key={id} style={{ textDecoration: 'none' }}>
              <Card style={{ width: '25rem' }}>
                <Card.Img
                  variant='top'
                  src={`${apiUrl}${image}`}
                  style={{ height: '300px' }}
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className='py-1'>
                    {price} <span>&#36;</span>
                  </Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </Container>

      {totalPages > 1 && (
        <div className='d-flex justify-content-center'>
          <Paginator totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default MainProduct;
