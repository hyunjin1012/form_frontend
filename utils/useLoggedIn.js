import { useEffect, useState } from "react";

export default function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  });
  return isLoggedIn;
}
