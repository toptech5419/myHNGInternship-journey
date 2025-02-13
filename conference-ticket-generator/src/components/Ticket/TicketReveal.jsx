import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import QRCode from './QRCode';

const TicketReveal = ({ ticket }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ticket-reveal ${isRevealed ? 'revealed' : ''}`}>
      <div className="ticket-inner">
        <div className="ticket-content">
          <h2>Techember Fest &apos;25</h2> {/* ✅ Fixed apostrophe issue */}
          <div className="ticket-details">
            <img 
              src={ticket.avatar || '/default-avatar.png'} 
              alt="Attendee" 
              className="ticket-avatar"
            />
            <div className="ticket-info">
              <h3>{ticket.fullName}</h3>
              <p>{ticket.email}</p>
              <p className="ticket-type">{ticket.ticketType}</p>
            </div>
          </div>
          <QRCode data={`${ticket.fullName}-${Date.now()}`} />
          <div className="ticket-footer">
            <p>December 25th, 2025</p>
            <p>Grand World Convention Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Add PropTypes Validation
TicketReveal.propTypes = {
  ticket: PropTypes.shape({
    avatar: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketReveal;
