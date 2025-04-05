// src/components/forms/UserForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { usersService } from '../../services/apiService';
import Button from '../common/Button/Button';
import './UserForm.scss';

const UserForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: ''
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    error: null,
    data: null
  });

  // Get authentication state
  const { isAuthenticated } = useContext(AuthContext);

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.surname.trim()) {
      errors.surname = 'Surname is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Reset submission state
    setIsSubmitting(true);
    setSubmitResult({
      success: false,
      error: null,
      data: null
    });
    
    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        throw new Error('You must be logged in to submit this form');
      }
      
      // Submit form data via service
      const result = await usersService.createUser(formData);
      
      // Update success state
      setSubmitResult({
        success: true,
        error: null,
        data: result
      });
      
      // Reset form
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Update error state
      setSubmitResult({
        success: false,
        error: error.response?.data?.message || error.message,
        data: null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>User Registration</h2>
      
      {submitResult.success && submitResult.data && (
        <div className="success-message">
          <strong>Success!</strong> User created successfully!
          <div className="success-details">
            <p>ID: {submitResult.data.id}</p>
            <p>Name: {submitResult.data.name} {submitResult.data.surname}</p>
          </div>
        </div>
      )}
      
      {submitResult.error && (
        <div className="error-message">
          {submitResult.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isAuthenticated}
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>
        
        <div className={`form-group ${formErrors.surname ? 'has-error' : ''}`}>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            disabled={!isAuthenticated}
          />
          {formErrors.surname && <span className="error">{formErrors.surname}</span>}
        </div>
        
        <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isAuthenticated}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        
        <div className={`form-group ${formErrors.phone ? 'has-error' : ''}`}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isAuthenticated}
          />
          {formErrors.phone && <span className="error">{formErrors.phone}</span>}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isAuthenticated}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        
        {!isAuthenticated && (
          <p className="login-required">Please log in to submit this form.</p>
        )}
      </form>
    </div>
  );
};

export default UserForm;