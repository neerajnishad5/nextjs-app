import { Box, Button, Typography } from "@mui/material";
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
};

export default async function Home() {
  // API REQUEST
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // disables caching (important for learning)
  });

  const users: User[] = await res.json();

  return (
    <Box className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-black">
      <Typography className="text-white">Hello Home</Typography>

      {users.map((user) => (
        <Box
          key={user.id}
          className="border-2 border-amber-200 rounded-xl p-2 mb-2 flex items-center justify-center"
        >
          <Typography className="text-white">{user.name}</Typography>
          <Typography className="text-white">{user.email}</Typography>
        </Box>
      ))}
    </Box>
  );
}
