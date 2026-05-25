import { Router } from "express";
import { getSingleProduct, listProductFilters, listProducts } from "./products.controller";

const productsRouter = Router();

productsRouter.get("/meta/filters", listProductFilters);
productsRouter.get("/", listProducts);
productsRouter.get("/:slug", getSingleProduct);

export { productsRouter };
