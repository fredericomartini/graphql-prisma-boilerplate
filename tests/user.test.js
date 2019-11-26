import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createUser, loginUser, getUsers } from './utils/operations';

const client = getClient();

beforeEach(seedDatabase);

it('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Jane Doe',
      email: 'Jane@example.com',
      password: 'the-secret',
    },
  };

  const { data } = await client.mutate({
    mutation: createUser,
    variables,
  });

  const exists = await prisma.exists.User(null, {
    id: data.createUser.user.id,
  });

  expect(exists).toBe(true);
});

it('Should not login with bad credentials', async () => {
  const variables = {
    data: { email: 'abc@example.com', password: 'password-not-exists' },
  };

  expect(
    client.mutate({
      mutation: loginUser,
      variables,
    })
  ).rejects.toThrow();
});

it('Should login', async () => {
  const variables = {
    data: { email: 'john@example.com', password: 'super-password-123' },
  };

  const response = await client.mutate({
    mutation: loginUser,
    variables,
  });

  expect(response).toMatchObject({
    data: { login: { token: expect.any(String) } },
  });
});

it('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers });

  // Assertions
  expect(response.data.users.length).toBe(1);
  const [user] = response.data.users;
  // Not allowed to show users email
  expect(user.email).toBe(null);
  expect(user.name).toBe('Jonh Doe');
});
