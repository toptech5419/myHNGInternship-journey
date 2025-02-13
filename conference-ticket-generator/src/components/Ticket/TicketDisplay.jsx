import PropTypes from 'prop-types';

const TicketDisplay = ({ fullName, email, ticketType }) => {
  return (
    <div className="ticket fade-in">
      <div className="ticket-header">
        <h3>Techember Fest &apos;25</h3> {/* ✅ Fixed apostrophe issue */}
        <p>December 25th, 2025</p>
      </div>
      
      <div className="ticket-body">
      <img 
       src="https://res.cloudinary.com/dobswpm5q/image/upload/sample.jpg" 
       alt="Attendee" 
        className="ticket-avatar"
      />

        <div className="ticket-info">
          <h4>{fullName}</h4>
          <p>{email}</p>
          <p className="ticket-type">{ticketType}</p>
        </div>
      </div>
      
      <div className="barcode"></div>
    </div>
  );
};

// ✅ Add PropTypes Validation
TicketDisplay.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
};

export default TicketDisplay;
