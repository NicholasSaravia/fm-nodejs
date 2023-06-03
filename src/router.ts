import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import {
  errorValidation,
  optionalString,
  requiredString,
} from "./utlis/router";

const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {
  res.status(200);
  res.json({ message: "Hello World" });
});
router.get("/product/:id", (req, rest) => {});

router.put(
  "/product/:id",
  [
    requiredString("name").isLength({
      min: 0,
      max: 255,
    }),
  ],
  errorValidation,
  (req, res) => {}
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
  (req, res) => {}
);

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */
router.get("/update", (req, res) => {});
router.get("/update/:id", (req, rest) => {});

router.put(
  "/update/:id",
  [
    requiredString("title"),
    requiredString("body"),
    requiredString("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    optionalString("version"),
    optionalString("asset"),
    optionalString("productId"),
  ],
  errorValidation,
  (req, res) => {}
);

router.post(
  "/update",
  [
    requiredString("title"),
    requiredString("body"),
    optionalString("version"),
    optionalString("asset"),
    optionalString("productId"),
  ],
  errorValidation,
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

/**
 * Update Point
 */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, rest) => {});
router.put("/updatepoint/:id", (req, res) => {});
router.post("/updatepoint", (req, res) => {});
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
