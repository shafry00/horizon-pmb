import "server-only";
import { getUser } from "./dal";
import { redirect } from "next/navigation";
// import { User } from "@prisma/client";

// function canSeeUsername(currentUser: User) {
//   return currentUser.role === "ADMIN" || currentUser.role === "SUPER_ADMIN";
// }
// function canSeePhoneNumber(viewer: User, team: string) {
//   return viewer.isAdmin || team === viewer.team
// }

export async function getProfileDTO() {
  const currentUser = await getUser();

  if (!currentUser) {
    redirect("/id/auth/sign-in");
  }
  return {
    id: currentUser.id,
    email: currentUser.email,
    role: currentUser.role,
  };
}
