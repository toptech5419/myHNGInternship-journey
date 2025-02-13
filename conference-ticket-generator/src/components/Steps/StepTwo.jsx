import PropTypes from 'prop-types';
import ImageUpload from '../Form/ImageUpload';
import ValidationError from '../Form/ValidationError';

const StepTwo = ({ formData, setFormData, errors, onBack, onNext }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to`, value);

        setFormData({ [name]: value });
    };
    
    
    
    

  return (
    <div className="card fade-in">
      <h2 className="text-center mb-4">Attendee Details</h2>

      <ImageUpload
        value={formData.avatar}  
        onChange={(url) => {
            console.log("Updating avatar URL:", url); 
            setFormData((prev) => ({ ...prev, avatar: url }));
        }} 
      />

      {errors.avatar && <ValidationError message={errors.avatar} />}

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="form-input"
          value={formData.fullName || ''} 
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.fullName && <ValidationError message={errors.fullName} />}
      </div>

      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={formData.email || ''} 
          onChange={handleChange}
          placeholder="your@email.com"
        />
        {errors.email && <ValidationError message={errors.email} />}
      </div>

      <div className="form-group">
        <label className="form-label">Special Requests</label>
        <textarea
          name="specialRequests"
          className="form-input"
          value={formData.specialRequests || ''} 
          onChange={handleChange}
          placeholder="Any dietary requirements or accessibility needs?"
          rows="3"
        />
      </div>

      <div className="button-group">
        <button className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Get My Ticket
        </button>
      </div>
    </div>
  );
};

// ✅ Add PropTypes Validation
StepTwo.propTypes = {
  formData: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    specialRequests: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};






export default StepTwo;
