import { Request, Response, NextFunction } from 'express';
import productModel from '../models/product.model';
const product = new productModel();

class productsController {
  //get all products
  getAll = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const allPs = await product.getAllPros();
      res.json({ ...allPs });
    } catch (err) {
      //next(err);
      res.send(err);
    }
  };

  //create product
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct = await product.addProduct(req.body);

      res.json({
        message: 'PRODUCT ADDED SUCCESSFULLY',
        data: { ...newProduct },
      });
    } catch (err) {
      res.send(err);
    }
  };

  //get product by id
  getProduct = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const id = req.params.id as string;
      console.log(id);
      const speProduct = await product.getOne(+id);
      res.json({
        speProduct,
      });
    } catch (err) {
      res.send(err);
    }
  };

  //get product by category
  getByCategory = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const category = req.params.category as string;
      console.log(category);
      const result = await product.getByCat(category);
      res.json({
        result,
      });
    } catch (err) {
      res.send(err);
    }
  };
}

export default productsController;
