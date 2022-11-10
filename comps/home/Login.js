import { useState } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../../apollo";
import AuthError from "./AuthError";

export default function Login() {
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const onSubmitValid = (data) => {};
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>
        <form
          className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmitValid)}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
              id="email"
              type="text"
              placeholder="abc@form.com"
              name="email"
              {...register("email", { required: "Email address, please" })}
              aria-invalid={formState.errors?.email?.message ? "true" : "false"}
            />
            <AuthError message={formState.errors?.email?.message} />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-200 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              aria-invalid={
                formState.errors?.password?.message ? "true" : "false"
              }
              {...register("password", { required: "Password, please." })}
            />
            <AuthError message={formState.errors?.password?.message} />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
              type="button"
              onClick={(e) => isLoggedInVar(true)}
              disabled={!formState.isValid}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      <div class="flex gap-2">
        <span>Don't have an account?</span>
        <a class="text-teal-500" href="/signUp">
          Sign Up
        </a>
      </div>
    </div>
  );
}
