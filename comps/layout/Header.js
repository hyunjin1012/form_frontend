export default function Header() {
  return (
    <nav class="flex items-center flex-wrap bg-teal-500 p-6">
      <div class="w-full block flex items-center justify-end">
        <div className="flex gap-3 justify-items-end">
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
          >
            Log In
          </a>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}
