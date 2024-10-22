import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../app/services/usersApi";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { setCredentials } from "../../features/authSlice";
import FormInput from "../../ui/forms/FormInput";
import styles from './Register.module.css';


// Паттерны для валидации полей
const namePattern = /^[A-Za-z0-9]{1,16}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !namePattern.test(value)) {
      error = 'Name must contain only letters and numbers, up to 9 characters.';
    }
    if (name === 'email' && !emailPattern.test(value)) {
      error = 'Please enter a valid email address.';
    }
    if (name === 'password' && !passwordPattern.test(value)) {
      error = 'Password must be 6-16 characters and contain only letters and numbers.';
    }
    if (name === 'confirmPassword' && value !== formData.password) {
      error = 'Passwords do not match.';
    }

    setErrors({ ...errors, [name]: error });
  };

  const isFormValid = () => {
    const valid = !Object.values(errors).some((error) => error) && Object.values(formData).every((value) => value !== '');
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const res = await register({ name, email: email.toLowerCase(), password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/products/my');
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  return (
    <Layout>
      <div className={styles.registerContainer}>
        <h1 className={styles.registerTitle}>Sign Up</h1>
        <Form className="mt-3" onSubmit={submitHandler}>
          <FormInput
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChange}
            errorMessage={errors.name}
            required
            className={styles.formControl}
          />

          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            errorMessage={errors.email}
            required
            autocomplete="off"
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
            autocomplete='off'
            className={styles.formControl}
          />

          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChange}
            errorMessage={errors.confirmPassword}
            required
            autocomplete='off'
            className={styles.formControl}
          />

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className={styles.registerButton} disabled={!isFormValid()}>
            Sign Up
          </Button>

          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
