import Seo from "../comps/layout/SEO";
import SignUp from "../comps/home/SignUp";

export default function AddUser() {
  return (
    <div>
      <Seo title="Sign up to create your form" />
      <main className="h-screen flex flex-col items-center justify-center">
        <SignUp />
      </main>
    </div>
  );
}
