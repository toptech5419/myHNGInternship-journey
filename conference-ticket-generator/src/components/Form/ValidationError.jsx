import PropTypes from 'prop-types';

const ValidationError = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

ValidationError.propTypes = {
  message: PropTypes.string.isRequired
};

export default ValidationError;
