import Seo from "../comps/layout/SEO";

export default function SignUp() {
  return (
    <div>
      <Seo title="Sign up to create your form" />
      <main className="h-screen flex flex-col items-center justify-center">
        <div>
          <form className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-200 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
              />
            </div>
            <div class="flex items-center justify-center">
              <button
                class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
