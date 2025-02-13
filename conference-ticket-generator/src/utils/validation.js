export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateImageUrl = (url) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
};


export const validateForm = (formData) => {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  } else if (formData.fullName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters long';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.avatar && !validateImageUrl(formData.avatar)) {
    errors.avatar = 'Please provide a valid image URL';
  }

  return errors;
};
