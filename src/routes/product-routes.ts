import { errorValidation, requiredString } from "../utlis/router";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../handlers/product";

export const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", getProduct);

router.put(
  "/product/:id",
  [
    requiredString("name").isLength({
      min: 0,
      max: 255,
    }),
  ],
  errorValidation,
  updateProduct
);

router.post(
  "/product",
  [
    requiredString("name").isLength({
      min: 0,
      max: 255,
    }),
  ],
  errorValidation,
  createProduct
);

router.delete("/product/:id", (req, res) => deleteProduct);
