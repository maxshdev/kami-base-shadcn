export interface DemoUser {
  name: string;
  email: string;
  role: string;
  access_token: string;
}

export const demoLogin = async (email: string, password: string): Promise<DemoUser> => {
  await new Promise(res => setTimeout(res, 400));

  const admins: { [key: string]: string } = {
    "admin@demo.local": "admin1234",
  };
  const users: { [key: string]: string } = {
    "user@demo.local": "user1234",
  };

  if (admins[email] && admins[email] === password) {
    return { name: "Admin Demo", email, role: "SuperAdmin", access_token: "demo-token-admin" };
  }

  if (users[email] && users[email] === password) {
    return { name: "User Demo", email, role: "ClientAdmin", access_token: "demo-token-user" };
  }

  throw new Error("Credenciales inválidas (usar admin@demo.local/admin1234 o user@demo.local/user1234)");
};
