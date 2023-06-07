import { Router } from "express";
import { body, query } from "express-validator";
import {
  errorValidation,
  optionalString,
  requiredString,
} from "./utlis/router";
import { router as updateRoutes } from "./routes/update-routes";
import { router as productRoutes } from "./routes/product-routes";

const router = Router();

router.use(updateRoutes);
router.use(productRoutes);

/**
 * Update Point
 */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, rest) => {});

router.put(
  "/updatepoint/:id",
  [
    body("updatedAt").isDate().notEmpty(),
    optionalString("updateId"),
    optionalString("name"),
    optionalString("description"),
  ],
  errorValidation,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello World" });
  }
);

router.post(
  "/updatepoint",
  [
    body("updatedAt").isDate().notEmpty(),
    requiredString("updateId"),
    requiredString("name"),
    requiredString("description"),
  ],
  errorValidation,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello World" });
  }
);

router.delete(
  "/updatepoint/:id",
  query("id").exists(),
  errorValidation,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello World" });
  }
);

export default router;
