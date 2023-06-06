import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "../handlers/update";
import {
  errorValidation,
  optionalString,
  requiredString,
} from "../utlis/router";
import { Router } from "express";

const router = Router();

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);

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
  updateUpdate
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
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

export default router;
