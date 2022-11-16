import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthError from "../../comps/home/AuthError";
import useUser from "../../utils/useUser";

const UPLOAD_MUTATION = gql`
  mutation uploadPost($title: String, $content: String) {
    uploadPost(title: $title, content: $content) {
      ok
      error
      post {
        id
      }
    }
  }
`;

export default function Create() {
  const router = useRouter();
  const me = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    setError,
  } = useForm({ mode: "onBlur" });
  const onCompleted = (data) => {
    const {
      uploadPost: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    } else router.push({ pathname: "/" });
  };
  const [uploadPost, { loading }] = useMutation(UPLOAD_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    uploadPost({ variables: { ...data } });
  };
  return (
    <div className="flex items-center justify-center p-8 h-screen">
      <form
        className="w-[90%] justify-center items-center flex flex-col"
        onSubmit={handleSubmit(onSubmitValid)}
      >
        <input
          type="text"
          placeholder="Add title"
          name="title"
          {...register("title")}
          className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none mb-3 focus:outline-none focus:ring w-full"
        ></input>
        <input
          type="text"
          placeholder="Share your thoughts..."
          name="content"
          {...register("content", { required: true })}
          onFocus={() => clearErrors("content")}
          className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
        ></input>
        <AuthError message={errors?.content?.message} />
        <AuthError message={errors?.result?.message} />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline disabled:opacity-20"
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? "Hold on..." : "Post"}
        </button>
      </form>
    </div>
  );
}
