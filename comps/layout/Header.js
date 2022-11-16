import { useRouter } from "next/router";
import useLoggedIn from "../../utils/useLoggedIn";
import useUser from "../../utils/useUser";

export default function Header() {
  const isLoggedIn = useLoggedIn();
  const router = useRouter();
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/");
    }
  };
  const data = useUser();
  return (
    <nav className="flex items-center flex-wrap bg-teal-500 p-6">
      <div className="w-full block flex items-center justify-between">
        <a
          href="/"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
        >
          Home
        </a>
        {isLoggedIn ? (
          <div className="flex gap-3 items-center justify-items-end">
            {data?.me?.email && (
              <span className="mr-3 text-white">{"Hi, " + data.me.email}</span>
            )}
            <a
              href="/write"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
            >
              Write
            </a>
            {/* <a
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
              href="/profile"
            >
              Edit Profile
            </a> */}
            <button
              onClick={logOut}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-3 justify-items-end">
            <a
              href="/"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
            >
              Log In
            </a>
            <a
              href="/signUp"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
