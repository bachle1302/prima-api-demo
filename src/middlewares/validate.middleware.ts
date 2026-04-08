import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body); // 🔥 validate

      next();
    } catch (err: any) {
      return res.status(400).json({
        message: err.errors
      });
    }
  };
};