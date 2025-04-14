import { gql } from "@apollo/client";

export const ONBOARDING_QUIZ = gql`
  query Questions {
    questions {
      id
      name
      options
    }
  }
`;
