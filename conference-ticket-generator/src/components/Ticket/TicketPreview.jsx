import { useRef } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import { downloadTicket } from '../../utils/ticketDownload';

const TicketPreview = ({ ticket }) => {
  const ticketRef = useRef();

  return (
    <div className="ticket-preview-container">
      <div ref={ticketRef} className="ticket-preview">
        <div className="ticket-header">
          <h2>Techember Fest &apos;25</h2> {/* ✅ Fixed apostrophe issue */}
          <div className="ticket-date">December 25th, 2025</div>
        </div>
        
        <div className="ticket-content">
          <div className="ticket-avatar-container">
            <img 
              src={ticket.avatar || '/default-avatar.png'} 
              alt="Attendee" 
              className="ticket-avatar"
            />
          </div>
          
          <div className="ticket-details">
            <h3>{ticket.fullName}</h3>
            <p>{ticket.email}</p>
            <p className="ticket-type">{ticket.ticketType}</p>
          </div>
        </div>
        
        <div className="ticket-footer">
          <div className="barcode"></div>
          <p className="ticket-id">#{Math.random().toString(36).substr(2, 9)}</p>
        </div>
      </div>
      
      <button 
        className="btn btn-primary download-btn"
        onClick={() => downloadTicket(ticketRef)}
      >
        Download Ticket
      </button>
    </div>
  );
};

// ✅ Add PropTypes Validation
TicketPreview.propTypes = {
  ticket: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketPreview;
