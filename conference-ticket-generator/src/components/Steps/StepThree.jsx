import PropTypes from 'prop-types';
import TicketDisplay from '../Ticket/TicketDisplay';




const StepThree = ({ formData, ticketType, onBack }) => {
  return (
    <div className="card fade-in">
      <h2 className="text-center mb-4">Your Ticket is Booked!</h2>
      <p className="text-center mb-4">
        Check your email for a copy or you can download below!
      </p>

      <TicketDisplay
        fullName={formData.fullName}
        email={formData.email}
        avatar={formData.avatar || '/default-avatar.png'}
        ticketType={ticketType}
      />

      <div className="button-group">
        <button className="btn btn-secondary" onClick={onBack}>
          Book Another Ticket
        </button>
        <button className="btn btn-primary">
          Download Ticket
        </button>
      </div>
    </div>
  );
};



// ✅ Add PropTypes Validation
StepThree.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired, // Ensure fullName is a required string
    email: PropTypes.string.isRequired, // Ensure email is a required string
    avatar: PropTypes.string, // Optional avatar (URL or base64)
  }).isRequired,
  ticketType: PropTypes.string.isRequired, // Ensure ticketType is a required string
  onBack: PropTypes.func.isRequired, // Ensure onBack is a required function
};


export default StepThree;
