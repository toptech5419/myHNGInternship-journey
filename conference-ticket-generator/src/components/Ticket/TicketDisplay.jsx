import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';

const TicketDisplay = ({ fullName, email, avatar, ticketType }) => {
    const [currentAvatar, setCurrentAvatar] = useState(avatar);

    useEffect(() => {
        // Validate image URL when component mounts
        const img = new Image();
        img.src = avatar;
        img.onload = () => setCurrentAvatar(avatar);
        img.onerror = () => setCurrentAvatar('/default-avatar.png');
    }, [avatar]);
  
    return (
        <div className="ticket fade-in">
            <div className="ticket-header">
                <h3>Techember Fest &apos;25</h3>
                <p>December 25th, 2025</p>
            </div>
            <div className="ticket-body">
                <img 
                    src={currentAvatar}
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

TicketDisplay.propTypes = {
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    ticketType: PropTypes.string.isRequired,
};

TicketDisplay.defaultProps = {
    avatar: '/default-avatar.png'
};

export default TicketDisplay;