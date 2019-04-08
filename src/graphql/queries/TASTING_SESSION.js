import gql from "graphql-tag";
const TASTING_SESSION = gql`
  query tastingSession($id: ID!) {
    tastingSession(where: { id: $id }) {
      id
      wines {
        id
        name
        grapes
        winery
        year
        alcohol
        price
      }
      wineTasters {
        id
        name
        nationality
        gender
        age
        favouriteWine {
          name
          grapes
        }
        reviews {
          id
          wine {
            id
            name
          }
          score
        }
      }
      reviews {
        id
        wine {
          id
          name
        }
        wineTaster{
          id
          name
        }
        tastingSession {
          id
        }
        score
        tastingNotes
      }
    }
  }
`;

export default TASTING_SESSION;
