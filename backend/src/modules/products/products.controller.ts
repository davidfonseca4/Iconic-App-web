import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middlewares/error.middleware";
import { getProductBySlug, getProductFilters, getProducts } from "./products.service";
import { productListQuerySchema, productSlugSchema } from "./products.validator";

export const listProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = productListQuerySchema.parse(req.query);
    const result = await getProducts(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = productSlugSchema.parse(req.params);
    const product = await getProductBySlug(slug);

    if (!product) {
      throw new HttpError(404, "PRODUCT_NOT_FOUND", "Product not found");
    }

    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const listProductFilters = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = await getProductFilters();
    res.status(200).json({ data: filters });
  } catch (error) {
    next(error);
  }
};
