import PropTypes from 'prop-types';
import { QRCodeCanvas } from 'qrcode.react'; 
import { useMemo } from 'react';

const QRCode = ({ data }) => {
  const qrCode = useMemo(() => <QRCodeCanvas value={data} size={128} />, [data]);

  return <div className="qr-code">{qrCode}</div>;
};

// ✅ Add PropTypes Validation
QRCode.propTypes = {
  data: PropTypes.string.isRequired, // Ensure `data` is a required string
};

export default QRCode;
