import { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CategoryOption from '../../components/category/CategoryOption';
import FileInput from '../files/FileInput';
import FormInput from './FormInput';

const FormProduct = ({ onSubmit, initialData = {}, isLoading }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    price: initialData.price || '',
    description: initialData.description || '',
    categoryId: initialData.categoryId || '',
    image: null,
  });

  const prevInitialDataRef = useRef(initialData);
  const { title, price, description, categoryId, image } = formData;

  useEffect(() => {
    const prevInitialData = prevInitialDataRef.current;

    if (
      prevInitialData.title !== initialData.title ||
      prevInitialData.price !== initialData.price ||
      prevInitialData.description !== initialData.description ||
      prevInitialData.categoryId !== initialData.categoryId
    ) {
      setFormData({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        categoryId: initialData.categoryId || '',
        image: null,
      });

      prevInitialDataRef.current = initialData;
    }
  }, [initialData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onCategoryChange = (selectedCategory) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryId: selectedCategory,
    }));
  };


  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !description || !categoryId) {
      alert('Please fill in all required fields.');
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('price', price);
    form.append('description', description);
    form.append('categoryId', categoryId);

    if (image) {
      form.append('image', image);
    }

    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Product Name"
        type="text"
        required
      />
      <FormInput
        name="price"
        value={price}
        onChange={onChange}
        placeholder="Price"
        type="number"
        min="0"
        step="0.01"
        required
      />
      <FormInput
        name="description"
        value={description}
        onChange={onChange}
        placeholder="Description"
        type="text"
        required
      />
      <CategoryOption
        value={categoryId}
        onChange={onCategoryChange}
        required
      />
      <FileInput
        name="image"
        onChange={handleImageChange}
        label="Upload Product Image"
        maxSizeMB={5}
      />
      {isLoading ? (
        <Button variant="primary" disabled>
          Loading...
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="me-2">
          Save
        </Button>
      )}
    </Form>
  );
};

export default FormProduct;
