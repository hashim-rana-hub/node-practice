const validator = require("validator");

const registerValidator = ({ username, email, password }) => {
  const errors = {};

  if (!username || !validator.isAlphanumeric(username)) {
    errors.username = "Username must be alphanumeric";
  } else if (!validator.isLength(username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30 characters";
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

const loginValidator = ({ email, password }) => {
  const errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

const projectValidator = ({ title, description }) => {
  const errors = {};

  if (!title || !validator.isLength(title, { min: 3, max: 30 })) {
    errors.title = "Title must be between 3 and 30 characters";
  }

  if (!description || !validator.isLength(description, { min: 20, max: 100 })) {
    errors.description = "Description must be between 20 and 100 characters";
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

module.exports = { registerValidator, loginValidator, projectValidator };
