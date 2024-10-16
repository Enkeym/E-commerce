import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <Container className={`d-flex flex-column align-items-center justify-content-center ${styles['welcome-page']}`}>
      <div className={`text-center p-5 ${styles['welcome-jumbotron']}`}>
        <h1 className="display-4">Welcome to Our E-commerce!</h1>
        <p className="lead">Your favorite store is just a click away!</p>
        <hr className="my-4" />
        <p>Start shopping now or sign in to manage your account.</p>
        <div className="d-flex gap-3">
          <Link to="/login">
            <Button variant="primary" size="lg">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-secondary" size="lg">Sign Up</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Welcome;
