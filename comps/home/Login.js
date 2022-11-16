import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthError from "./AuthError";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const routerQuery = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: routerQuery?.email || "",
      password: routerQuery?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    }
    if (token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        router.push("/");
      }
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    login({
      variables: { ...data },
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <form
        className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmitValid)}
      >
        {routerQuery?.message ? (
          <div className="text-teal-500">{routerQuery.message}</div>
        ) : null}
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
              required: "Email address, please",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email address, please",
              },
            })}
            aria-invalid={errors?.email?.message ? "true" : "false"}
            onFocus={() => clearErrors(["result", "email"])}
          />
          <AuthError message={errors?.email?.message} />
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
            {...register("password", {
              required: "Password, please.",
            })}
            aria-invalid={errors?.password?.message ? "true" : "false"}
            onFocus={() => clearErrors(["password", "result"])}
          />
          <AuthError message={errors?.password?.message} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <AuthError message={errors?.result?.message} />
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-3 focus:outline-none focus:shadow-outline disabled:opacity-20"
            type="submit"
            disabled={!isValid || loading}
          >
            {loading ? "Hold on..." : "Log in"}
          </button>
        </div>
      </form>
      <div className="flex gap-2">
        <span>Don't have an account?</span>
        <a className="text-teal-500" href="/signUp">
          Sign Up
        </a>
      </div>
    </div>
  );
}
