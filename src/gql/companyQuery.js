import { gql } from "@apollo/client";

export const GET_COMPANY = gql`
  {
    company {
      employees
      founded
      founder
      summary
      valuation
      headquarters {
        address
        city
        state
      }
      links {
        elon_twitter
        flickr
        twitter
        website
      }
    }
  }
`;
