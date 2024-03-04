import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// crear categoría
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//actualizar categoría
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Obtener todad las categorias
router.get("/get-category", categoryControlller);

//Unica Categoria
router.get("/single-category/:slug", singleCategoryController);

//Eliminar Categoria
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;