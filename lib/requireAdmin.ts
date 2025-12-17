import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  await connect();

  const user = await User.findById(session.user.id);

  if (!user || user.role !== "admin") return null;

  return user;
}
