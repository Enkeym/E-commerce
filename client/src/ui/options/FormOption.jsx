import { useCallback } from "react";
import { Form } from "react-bootstrap";
import Loader from "../../components/loader/Loader";

const FormOption = ({ value, onChange, options = [], loading, error, placeholder = 'Select an option' }) => {

  const handleChange = useCallback((e) => {
    if (typeof onChange === 'function') {
      onChange(e.target.value);
    }
  }, [onChange]);

  return (
    <Form.Group className="mb-3">
      {loading && <Loader />}
      {error && <p className="text-danger">Error loading options.</p>}

      <Form.Select value={value} onChange={handleChange} required>
        <option value="">{placeholder}</option>
        {options.length === 0 ? (
          <option disabled>No options available</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </Form.Select>
    </Form.Group>
  );
};

export default FormOption;