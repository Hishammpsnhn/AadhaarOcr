import express from "express";
import multer from "multer";
import path from "path";
import { handleOcr } from "../controller/ocrController";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images", 2), handleOcr);

export default router;



