const { nameSchema, saleProductSchema, idSchema } = require('./schemas');

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

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateSaleProduct = (saleProduct) => {
  const { error } = saleProductSchema.validate(saleProduct);
  if (error) {
    return {
      type: error.message.includes('is required') ? 'NAME_IS_REQUIRED' : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateName,
  validateSaleProduct,
  validateId,
};