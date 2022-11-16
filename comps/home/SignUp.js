import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthError from "./AuthError";

const SIGNUP_MUTATION = gql`
  mutation addUser($email: String!, $password: String!, $name: String) {
    addUser(email: $email, password: $password, name: $name) {
      ok
      error
      user {
        id
      }
    }
  }
`;

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "onBlur",
  });
  const onCompleted = (data) => {
    const { email, password } = getValues();
    const {
      addUser: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    } else
      router.push(
        {
          pathname: "/",
          query: { message: "Ready to log in?", email, password },
        },
        "/"
      );
  };
  const [addUser, { loading }] = useMutation(SIGNUP_MUTATION, { onCompleted });
  const onSubmitValid = (data) => {
    addUser({ variables: { ...data } });
  };
  return (
    <form
      className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmitValid)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
          id="email"
          type="text"
          placeholder="abc@form.com"
          name="email"
          {...register("email", {
            required: "Email address, please.",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email address, please.",
            },
          })}
          aria-invalid={errors?.email?.message ? "true" : "false"}
          onFocus={() => clearErrors(["result", "email"])}
        />
        <AuthError message={errors?.email?.message} />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
          id="name"
          type="text"
          placeholder="IAmAbc"
          name="name"
          {...register("name")}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          name="password"
          {...register("password", { required: "Password, please." })}
          aria-invalid={errors?.password?.message ? "true" : "false"}
          onFocus={() => clearErrors(["result", "password"])}
        />
        <AuthError message={errors?.password?.message} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <AuthError message={errors?.result?.message} />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? "Hold on..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
