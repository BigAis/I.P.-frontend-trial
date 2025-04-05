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

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    error: null,
    data: null
  });

  // Get authentication state
  const { isAuthenticated } = useContext(AuthContext);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      
      // Call the user service to create a new user
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
          User created successfully! ID: {submitResult.data.id}, Name: {submitResult.data.name}
        </div>
      )}
      
      {submitResult.error && (
        <div className="error-message">
          {submitResult.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
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