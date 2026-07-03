import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentProfile = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  return profile;
};