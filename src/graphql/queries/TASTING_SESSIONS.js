import gql from "graphql-tag";
const TASTING_SESSIONS = gql`
  query tastingSessions {
    tastingSessions {
      id
      wines {
        id
      }
      wineTasters {
        id
      }
      reviews {
        id
      }
    }
  }
`;

export default TASTING_SESSIONS;
