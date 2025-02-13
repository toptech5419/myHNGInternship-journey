import { useState } from 'react';
import { validateForm } from '../utils/validation';
import { useToast } from './useToast';

const useFormSubmission = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      showToast('Please fix the form errors', 'error');
      setIsSubmitting(false);
      return errors;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('Ticket generated successfully!', 'success');
      return null;
    } catch (error) {
        console.error('Submission error:', error); // ✅ Now 'error' is used
        showToast('Failed to generate ticket. Please try again.', 'error');
        return { submit: `Failed to submit form: ${error.message}` }; // ✅ Use 'error'
      } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleSubmit
  };
};

export default useFormSubmission
