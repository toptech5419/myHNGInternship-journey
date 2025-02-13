import PropTypes from 'prop-types';

const ProgressIndicator = ({ currentStep, totalSteps, progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-steps">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`progress-step ${
              index + 1 <= currentStep ? 'active' : ''
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">
              {index === 0
                ? 'Select Ticket'
                : index === 1
                ? 'Your Details'
                : 'Confirmation'}
            </div>
          </div>
        ))}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}  
        />
      </div>
    </div>
  );
};

// ✅ Add PropTypes Validation
ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired, // Ensure it's a required number
  totalSteps: PropTypes.number.isRequired,  // Ensure it's a required number
  progress: PropTypes.number.isRequired     // Ensure it's a required number
};

export default ProgressIndicator;
