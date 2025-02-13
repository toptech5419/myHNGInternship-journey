import PropTypes from 'prop-types';
import { QRCodeCanvas } from 'qrcode.react'; // QR code library

const QRCode = ({ data }) => {
  return (
    <div className="qr-code">
      <QRCodeCanvas value={data} size={128} />
    </div>
  );
};

// ✅ Add PropTypes Validation
QRCode.propTypes = {
  data: PropTypes.string.isRequired, // Ensure `data` is a required string
};

export default QRCode;
