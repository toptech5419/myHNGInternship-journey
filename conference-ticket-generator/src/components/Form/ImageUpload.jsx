// components/Form/ImageUpload.jsx
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, Loader2 } from 'lucide-react';

const ImageUpload = ({ value = '', onChange, maxSizeInMB = 5 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes

  const validateFile = (file) => {
    setError('');

    // Check if file exists
    if (!file) {
      setError('Please select a file');
      return false;
    }

    // Check file size
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload an image file (JPEG, PNG, GIF, or WEBP)');
      return false;
    }

    return true;
  };

  const uploadFile = async (file) => {
    try {
      setIsLoading(true);
      setError('');
  
      console.log("Uploading file:", file.name); // Debugging
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'toptech5419');
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dobswpm5q/image/upload`, 
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary Upload Error:", errorData);
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      console.log("Cloudinary Response:", data); // Debugging
  
      onChange(data.secure_url || '');
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleFile = async (file) => {
    if (validateFile(file)) {
      await uploadFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    await handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragging 
            ? 'border-teal-500 bg-teal-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-teal-400'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept="image/*"
        />

        {isLoading ? (
          <div className="space-y-2">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-teal-500" />
            <p className="text-sm text-gray-600">Uploading image...</p>
          </div>
        ) : value ? (
          <div className="relative inline-block">
            <img
              src={value}
              alt="Upload preview"
              className="max-w-[200px] max-h-[200px] rounded-lg object-cover mx-auto"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Drop your image here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Maximum file size: {maxSizeInMB}MB (JPEG, PNG, GIF, WEBP)
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxSizeInMB: PropTypes.number
};


export default ImageUpload;