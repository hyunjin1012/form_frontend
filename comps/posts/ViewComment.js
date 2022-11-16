import { gql, useQuery } from "@apollo/client";
import timeAgo from "../../utils/timeDifference";

export const GET_AUTHOR = gql`
  query seeProfile($id: Int!) {
    seeProfile(id: $id) {
      email
      name
    }
  }
`;

export default function ViewComment({ comment }) {
  const authorData = useQuery(GET_AUTHOR, {
    variables: { id: comment.authorId },
  });
  const author = authorData?.data?.seeProfile;
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <span className="font-bold">{author?.email}</span>
        <span>{comment.content}</span>
      </div>
      <span className="text-gray-500">{timeAgo(comment.createdAt)}</span>
    </div>
  );
}
