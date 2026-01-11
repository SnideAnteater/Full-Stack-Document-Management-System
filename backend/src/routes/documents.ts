import { Router, Request, Response, Express } from "express";
import { body, param, query, validationResult } from "express-validator";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  deleteDocument,
  searchDocuments,
  getDocumentsByFolderId,
} from "../db/queries";
import { DocumentType, ApiResponse, CreateDocumentRequest } from "../types";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

const validate = (req: Request, res: Response, next: Function) => {
  // console.log("Validating request...");
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

// export default function documentsRoutes(app: Express) {
//   console.log("Registering document routes...");
//   app.get("/api/documents", (req: Request, res: Response) => {
//     getAllDocumentsExample(req, res);
//   });
// }

// function getAllDocumentsExample(req: Request, res: Response): void {
//   console.log("Fetching all documents...", req.query, req.params);
// }

// router.get("/", (req, res) => {
//   res.send("Testing documents route");
// });

// Routes

router.get(
  "/",
  [query("search").optional().isString().trim()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    // console.log("Query Params:", req.query);
    const searchQuery = req.query.search as string | undefined;
    const folderId = req.query.folderId as string | undefined;

    let documents;
    if (searchQuery) {
      documents = await searchDocuments(searchQuery);
    } else if (folderId) {
      documents = await getDocumentsByFolderId(folderId);
    } else {
      documents = await getAllDocuments();
    }

    const response: ApiResponse = {
      success: true,
      data: documents,
    };
    res.json(response);
  })
);

router.get(
  "/:id",
  [param("id").isString().notEmpty()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    // console.log("Params:", req.params);
    const document = await getDocumentById(req.params.id as string);

    if (!document) {
      const response: ApiResponse = {
        success: false,
        error: "Document not found",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: document,
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
      .withMessage("Document name is required")
      .isLength({ max: 255 })
      .withMessage("Document name must be less than 255 characters")
      .matches(/^[^<>:"/\\|?*]+$/)
      .withMessage("Document name contains invalid characters"),
    body("type")
      .isString()
      .isIn(Object.values(DocumentType))
      .withMessage("Invalid document type"),
    body("folderId").optional({ nullable: true }).isString(),
  ],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const data: CreateDocumentRequest = {
      name: req.body.name,
      type: req.body.type,
      folderId: req.body.folderId || null,
    };

    // console.log("Creating document with request:", req.body);
    // console.log("Creating document with data:", data);

    const document = await createDocument(data);

    const response: ApiResponse = {
      success: true,
      data: document,
      message: "Document created successfully",
    };
    res.status(201).json(response);
  })
);

router.delete(
  "/:id",
  [param("id").isString().notEmpty()],
  validate,
  asyncHandler(async (req: Request, res: Response) => {
    const deleted = await deleteDocument(req.params.id as string);

    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        error: "Document not found",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: "Document deleted successfully",
    };
    res.json(response);
  })
);

export default router;
