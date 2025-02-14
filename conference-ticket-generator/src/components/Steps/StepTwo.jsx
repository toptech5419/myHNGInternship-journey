import PropTypes from 'prop-types';
import ImageUpload from '../Form/ImageUpload';
import ValidationError from '../Form/ValidationError';

// In StepTwo.jsx modify the handleChange:
const StepTwo = ({ formData, setFormData, errors, onBack, onNext }) => {
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ [name]: value }); // Only send the changed field
  };

  // Rest of the component remains the same

    

    return (
        <div className="card fade-in">
            <h2 className="text-center mb-4">Attendee Details</h2>

            <ImageUpload
    value={formData.avatar}
    onChange={(imageUrl) => {
        setFormData({ avatar: imageUrl }); // Directly update avatar field
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

            <div className="button-group">
                <button className="btn btn-secondary" onClick={onBack}>Back</button>
                <button className="btn btn-primary" onClick={onNext}>Get My Ticket</button>
            </div>
        </div>
    );
};

StepTwo.propTypes = {
    formData: PropTypes.shape({
        avatar: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default StepTwo;