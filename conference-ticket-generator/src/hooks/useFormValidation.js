import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = useCallback((formData) => {
    const newErrors = {};

    // Validate full name
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate avatar (optional)
    if (formData.avatar && !isValidImageUrl(formData.avatar)) {
      newErrors.avatar = 'Please provide a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { errors, validateForm };
};

const isValidImageUrl = (url) => {
  // Basic URL validation - in production, you might want more robust validation
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

export default useFormValidation;