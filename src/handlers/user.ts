import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../utlis/auth";

export const createUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await prisma.user.create({
    data: {
      userName,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.status(201).json(token);
};

export const signIn = async (req, res) => {
  const { userName, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      userName,
    },
  });

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Not Authorized" });
  }

  const token = createJWT(user);
  res.status(200).json(token);
};
