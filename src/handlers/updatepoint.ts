import prisma from "../db";

const getUpdatePoints = (req, res) => {
  return prisma.updatePoint.findMany({
    where: {},
  });
};
