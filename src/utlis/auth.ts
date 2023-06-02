import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bycrypt.compare(password, hashedPassword);
  return isMatch;
};

export const hashPassword = async (password) => {
  return await bycrypt.hash(password, 10);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer && !bearer.startsWith("Bearer")) {
    res.status(401);
    res.json({ message: "Authorization header not found" });
    return;
  }

  // split on empty space. bearer is the first element
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Did you forget to add your token?" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401);
    res.json({ message: "Token not valid" });
    return;
  }
};
