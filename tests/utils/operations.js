import { gql } from 'apollo-boost';

export const createUser = gql`
  mutation($data: CreateUser!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const loginUser = gql`
  mutation($data: LoginUser!) {
    login(data: $data) {
      token
    }
  }
`;

export const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;
