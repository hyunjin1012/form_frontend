import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { client } from "../../apollo";
import Seo from "../../comps/layout/SEO";
import PostComment from "../../comps/posts/PostComment";
import ViewComments from "../../comps/posts/ViewComments";
import timeAgo from "../../utils/timeDifference";

const GET_POSTS = gql`
  query seePosts($email: String) {
    seePosts(email: $email) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export async function getServerSideProps(context) {
  const { email } = context.query;
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { email: email },
    fetchPolicy: "network-only",
  });
  return { props: { posts: data.seePosts, email: email } };
}

export default function Posts({ posts, email }) {
  return (
    <div>
      <Seo title={email + "'s world"} />
      <main>
        <div className="flex flex-col items-center justify-center gap-3 p-8 min-h-screen">
          {posts?.map((post, index) => (
            <div
              key={index}
              className="w-[90%] rounded overflow-hidden shadow-lg p-5 md:w-[80%] lg:w-[65%]"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <div className="text-gray-700 text-base">{post.content}</div>
              </div>
              <div className="px-6 py-4 flex justify-end">
                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              written {timeAgo(post.createdAt)}
            </span> */}
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                  updated {timeAgo(post.updatedAt)}
                </span>
              </div>
              <PostComment postId={post.id} />
              <ViewComments postId={post.id} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
