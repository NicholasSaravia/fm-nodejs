import { Update } from "@prisma/client";
import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates: Update[] = products.reduce(
    (allUpdates, product) => [...allUpdates, ...product.updates],
    []
  );

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  console.log("hi");
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  console.log({ product });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        },
      },
    },
  });

  const updates: Update[] = products.reduce(
    (allUpdates, product) => [...allUpdates, ...product.updates],
    []
  );

  const update = updates.find((update) => update.id === req.params.id);

  if (!update) {
    return res.status(404).json({ error: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
      updatedAt: new Date(),
    },
  });
  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        },
      },
    },
  });

  const updates: Update[] = products.reduce(
    (allUpdates, product) => [...allUpdates, ...product.updates],
    []
  );

  const update = updates.find((update) => update.id === req.params.id);

  if (!update) {
    return res.status(404).json({ error: "Update not found" });
  }

  const updatedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: updatedUpdate });
};
