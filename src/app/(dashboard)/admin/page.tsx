import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <h2 className="text-4xl font-bold text-pink-600 rounded-lg hover:text-pink-700 transition-colors">
        Welcome back to your Space, {session?.user.username}
      </h2>
    );
  }

  return (
    <h2 className="text-4xl font-bold text-pink-600 rounded-lg hover:text-pink-700 transition-colors">
      Please Login to Load this page
    </h2>
  );
};

export default page;

