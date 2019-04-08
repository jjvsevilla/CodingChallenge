import gql from "graphql-tag";
const UPDATE_REVIEW = gql`
  mutation updateReview(
    $reviewID: ID!
    $wine: ID
    $wineTaster: ID!
    $tastingSession: ID!
    $score: Int
    $tastingNotes: [TastingNotes!]
  ) {
    updateReview(
      where: { id: $reviewID }
      data: {
        wine: { connect: { id: $wine } }
        wineTaster: { connect: { id: $wineTaster } }
        tastingSession: { connect: { id: $tastingSession } }
        score: $score
        tastingNotes: { set: $tastingNotes }
      }
    ) {
      id
    }
  }
`;

export default UPDATE_REVIEW;
