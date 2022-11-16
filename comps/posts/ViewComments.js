import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import ViewComment from "./ViewComment";

export const GET_COMMENTS = gql`
  query seeComments($postId: Int!) {
    seeComments(postId: $postId) {
      id
      content
      authorId
      createdAt
    }
  }
`;

export default function ViewComments({ postId }) {
  const commentsData = useQuery(GET_COMMENTS, { variables: { postId } });
  const comments = commentsData?.data?.seeComments;
  const [authorEmail, setAuthorEmail] = useState();
  return (
    <div>
      {comments?.map((comment, index) => (
        <div key={index} className="mx-8">
          <ViewComment comment={comment} />
        </div>
      ))}
    </div>
  );
}
