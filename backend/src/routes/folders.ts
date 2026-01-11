import { Router, Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";
import {
  getAllFolders,
  getFolderById,
  createFolder,
  deleteFolder,
  searchFolders,
  getAllDocumentsInFolder,
} from "../db/queries";
import { ApiResponse, CreateFolderRequest } from "../types";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      error: "Validation failed",
      message: errors.array()[0].msg,
    };
    return res.status(400).json(response);
  }
  next();
};

// Routes

router.get(
  "/",
  [query("search").optional().isString().trim()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const searchQuery = req.query.search as string | undefined;

    const folders = searchQuery
      ? await searchFolders(searchQuery)
      : await getAllFolders();

    const response: ApiResponse = {
      success: true,
      data: folders,
    };
    res.json(response);
  })
);

router.get(
  "/:id",
  [param("id").isString().notEmpty()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const documents = await getAllDocumentsInFolder(req.params.id as string);

    const response: ApiResponse = {
      success: true,
      data: documents,
    };
    res.json(response);
  })
);

router.post(
  "/",
  [
    body("name")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Folder name is required")
      .isLength({ max: 255 })
      .withMessage("Folder name must be less than 255 characters")
      .matches(/^[^<>:"/\\|?*]+$/)
      .withMessage("Folder name contains invalid characters"),
  ],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const data: CreateFolderRequest = {
      name: req.body.name,
    };

    const folder = await createFolder(data);

    const response: ApiResponse = {
      success: true,
      data: folder,
      message: "Folder created successfully",
    };
    res.status(201).json(response);
  })
);

router.delete(
  "/:id",
  [param("id").isString().notEmpty()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const deleted = await deleteFolder(req.params.id as string);

    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        error: "Folder not found",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: "Folder deleted successfully",
    };
    res.json(response);
  })
);

export default router;
