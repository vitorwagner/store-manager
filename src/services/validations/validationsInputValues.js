const { nameSchema } = require('./schemas');

const validateName = (name) => {
  if (!name) {
    return { type: 'NAME_IS_REQUIRED', message: '"name" is required' };
  }
  const { error } = nameSchema.validate(name);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateName,
};