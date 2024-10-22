
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../app/services/usersApi';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { setCredentials } from '../../features/authSlice';
import { setCartItems } from '../../features/cartSlice';
import FormInput from '../../ui/forms/FormInput';
import styles from './Login.module.css';

// Паттерны для валидации полей
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^[a-z0-9]{6,16}$/;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const validateField = (name, value) => {
    let error = '';

    if (name === 'email' && !emailPattern.test(value)) {
      error = 'Please enter a valid email address.';
    }

    if (name === 'password' && !passwordPattern.test(value)) {
      error = 'Password must be 6-16 characters and contain only letters and numbers.';
    }

    setErrors({ ...errors, [name]: error });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
  };

  const isFormValid = () => {
    return !Object.values(errors).some((error) => error) && Object.values(formData).every((value) => value !== '');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const res = await login({ email: email.toLowerCase(), password }).unwrap();
      dispatch(setCredentials(res));
      const cartItems = localStorage.getItem('CartItems');
      if (cartItems) {
        dispatch(setCartItems(JSON.parse(cartItems)));
        localStorage.removeItem('CartItems');
      }

      navigate('/products/my');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Layout>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Sign In</h1>
        <Form className="mt-3" onSubmit={submitHandler}>
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            errorMessage={errors.email}
            required
            autocomplete='email'
            className={styles.formControl}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            errorMessage={errors.password}
            required
            autocomplete="current-password"
            className={styles.formControl}
          />

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className={styles.loginButton} disabled={!isFormValid()}>
            Sign In
          </Button>

          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};
export default Login;
