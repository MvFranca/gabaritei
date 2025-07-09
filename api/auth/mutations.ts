import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      token
      message
      user {
        id
        email
        name
      }
    }
  }
`;
