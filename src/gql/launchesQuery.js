import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  {
    launches(sort: "launch_year") {
      id
      launch_year
      launch_success
      rocket {
        rocket_name
      }
      mission_name
      links {
        mission_patch_small
      }
    }
  }
`;

export const GET_LAUNCH = gql`
  query Launch($id: ID!) {
    launch(id: $id) {
      id
      launch_year
      launch_success
      mission_id
      launch_date_utc
      details
      rocket {
        rocket_name
        rocket_type
        rocket {
          id
        }
      }
      mission_name
      links {
        mission_patch_small
        flickr_images
        video_link
      }
      launch_site {
        site_name
      }
    }
  }
`;

export const GET_LATEST_LAUNCH_ID = gql`
  {
    launchLatest {
      id
    }
  }
`;

// export const GET_LAUNCHES_DETAIL = gql`
//   {
//     launches {
//       id
//       launch_year
//       launch_success
//       rocket {
//         rocket_name
//       }
//       mission_name
//       links {
//         mission_patch_small
//       }
//     }
//   }
// `;
