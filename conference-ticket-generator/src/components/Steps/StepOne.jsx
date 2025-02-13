import PropTypes from 'prop-types';

const StepOne = ({ selectedPrice, onSelectPrice, onNext }) => {
  const prices = [
    { id: 'free', label: 'Regular Access', price: 'Free' },
    { id: 'vip', label: 'VIP Access', price: '$150' },
    { id: 'vvip', label: 'VVIP Access', price: '$250' },
  ];

  return (
    <div className="card fade-in">
      <h2 className="text-center mb-4">Techember Fest &apos;25</h2>
      <p className="text-center mb-4">
        Join us for an unforgettable experience at Grand World
        <br />
        December 25th, 2025 | 9:00 AM - 5:00 PM
      </p>

      <div className="price-options">
        {prices.map((option) => (
          <div
            key={option.id}
            className={`price-card ${selectedPrice === option.id ? 'selected' : ''}`}
            onClick={() => onSelectPrice(option.id)}
          >
            <h3>{option.label}</h3>
            <div className="price-amount">{option.price}</div>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label className="form-label">Number of Tickets</label>
        <select className="form-input">
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button 
          className="btn btn-primary"
          onClick={onNext}
          disabled={!selectedPrice}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// PropTypes Validation
StepOne.propTypes = {
  selectedPrice: PropTypes.string.isRequired,
  onSelectPrice: PropTypes.func.isRequired, // Renamed from setSelectedPrice
  onNext: PropTypes.func.isRequired,
};

export default StepOne;
