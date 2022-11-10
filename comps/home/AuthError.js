export default function AuthError({ message }) {
  return message === "" || !message ? null : (
    <div className="text-red-500">{message}</div>
  );
}
