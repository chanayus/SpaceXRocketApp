import { gql } from "@apollo/client";

export const GET_ROCKET_NAME = gql`
  {
    rockets {
      id
      name
    }
  }
`;
