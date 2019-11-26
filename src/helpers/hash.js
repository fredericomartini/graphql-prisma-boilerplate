import bcrypt from 'bcryptjs';

const makeHash = password => {
  return bcrypt.hashSync(password, 10);
};

const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { makeHash, compareHash };
