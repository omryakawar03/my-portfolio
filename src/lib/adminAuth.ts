import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdmin() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;

  if (!token) throw new Error("NO_TOKEN");

  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}
