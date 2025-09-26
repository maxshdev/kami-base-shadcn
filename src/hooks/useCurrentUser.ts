import { useState, useEffect } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name,
        email: parsedUser.email,
        avatar: parsedUser.avatar,
        role: parsedUser.role,
      });
    }
  }, []);

  return user;
}