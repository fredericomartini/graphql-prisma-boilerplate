import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';
import { makeToken } from '../../src/helpers/jwt';

const userOne = {
  input: {
    name: 'Jonh Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('super-password-123', 10),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  // Delete Test Data
  await prisma.mutation.deleteManyUsers();

  // Create a user
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  // Add the user token
  userOne.jwt = makeToken({ userId: userOne.user.id });
};

export { seedDatabase as default, userOne };
