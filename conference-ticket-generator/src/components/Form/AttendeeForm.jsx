import PropTypes from 'prop-types';
import ValidationError from './ValidationError';

const AttendeeForm = ({ formData, setFormData, errors, isLoading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="attendee-form">
      <div className="form-group">
        <label htmlFor="fullName" className="form-label">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          className={`form-input ${errors.fullName ? 'error' : ''}`}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={isLoading}
          aria-describedby="fullNameError"
        />
        {errors.fullName && (
          <ValidationError 
            message={errors.fullName} 
            id="fullNameError" 
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          disabled={isLoading}
          aria-describedby="emailError"
        />
        {errors.email && (
          <ValidationError 
            message={errors.email} 
            id="emailError" 
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests" className="form-label">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          className="form-input"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any dietary requirements or accessibility needs?"
          disabled={isLoading}
          rows="3"
        />
      </div>
    </div>
  );
};

// **Add PropTypes validation**
AttendeeForm.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    specialRequests: PropTypes.string
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool.isRequired
};


export default AttendeeForm;
