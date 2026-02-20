import jwt from "jsonwebtoken";

type DecodedToken = {
  sub: string;
  role: string;
};

export function requireRole(
  req: Request,
  allowedRoles: string[]
): DecodedToken {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = auth.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.ADMIN_JWT_SECRET as string
  ) as DecodedToken;

  if (!allowedRoles.includes(decoded.role)) {
    throw new Error("Forbidden");
  }

  return decoded;
}
