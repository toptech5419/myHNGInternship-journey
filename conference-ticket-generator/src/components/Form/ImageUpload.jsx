import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, Loader2 } from 'lucide-react';

const ImageUpload = ({ value = '', onChange, maxSizeInMB = 5, uploadPreset = 'toptech5419' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024; 

  const validateFile = (file) => {
    setError('');

    if (!file) {
      setError('Please select a file');
      return false;
    }
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      setError('Only JPEG, PNG, GIF, or WEBP allowed');
      return false;
    }
    return true;
  };

  const uploadFile = async (file) => {
    try {
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/dobswpm5q/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        console.log("Uploaded Image URL:", data.secure_url); // Debugging
        onChange(data.secure_url || '');
    } catch (error) {
        console.error("Image upload error:", error);
        setError('Failed to upload image. Please try again.');
    } finally {
        setIsLoading(false);
    }
};


  const handleFileInput = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      await uploadFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFileInput({ target: { files: [file] } });
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
      >
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInput} accept="image/*" />

        {isLoading ? (
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-teal-500" />
        ) : value ? (
          <div className="relative inline-block">
            <img src={value} alt="Upload preview" className="max-w-[200px] max-h-[200px] rounded-lg object-cover mx-auto" />
            <button onClick={() => onChange('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxSizeInMB: PropTypes.number,
  uploadPreset: PropTypes.string, // ✅ Allow upload preset as a prop
};

export default ImageUpload;
