import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;
