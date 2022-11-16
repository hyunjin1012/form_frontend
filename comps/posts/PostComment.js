import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useUser from "../../utils/useUser";
import AuthError from "../home/AuthError";
import { GET_AUTHOR } from "./ViewComment";
import { GET_COMMENTS } from "./ViewComments";

const UPLOADCOMMENT_MUTATION = gql`
  mutation uploadComment($content: String, $postId: Int!) {
    uploadComment(content: $content, postId: $postId) {
      ok
      error
      comment {
        id
      }
    }
  }
`;

export default function PostComment({ postId }) {
  const router = useRouter();
  const user = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    setError,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });
  const onCompleted = (data) => {
    const {
      uploadComment: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    } else setValue("content", "");
  };
  //   const updateCommentCache = (cache, result) => {
  //     const { content } = getValues();
  //     setValue("content", "");
  //     const {
  //       data: {
  //         uploadComment: { ok, id },
  //       },
  //     } = result;

  //     if (ok && user?.me) {
  //       const newComment = {
  //         __typename: "Comment",
  //         createdAt: Date.now(),
  //         id,
  //         content,
  //         authorId: user.me.id,
  //         postId,
  //       };
  //       console.log(cache);
  //     }
  //   };
  const [uploadComment, { loading }] = useMutation(UPLOADCOMMENT_MUTATION, {
    // update: updateCommentCache,
    onCompleted,
    refetchQueries: [
      { query: GET_COMMENTS, variables: { postId } },
      { query: GET_AUTHOR, variables: { id: user?.me?.id } },
    ],
  });
  const onSubmitValid = (data) => {
    uploadComment({ variables: { content: data.content, postId } });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <div className="flex gap-3 m-8">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
          name="content"
          {...register("content", { required: "Please type in first." })}
        ></input>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
          disabled={!isValid || loading}
        >
          {loading ? "Hold On..." : "Comment"}
        </button>
      </div>
      {/* <AuthError message={errors?.result?.message} /> */}
    </form>
  );
}
