import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import Tesseract, { createWorker } from "tesseract.js";
import fs from "fs";
import sharp from "sharp";
import extractAadhaarInfo from "./utils/ExtractAadharInfo";

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
async function processImageForOCR(filePath: string): Promise<string> {
  const minWidth = 300;

  // Get image dimensions
  const metadata = await sharp(filePath).metadata();

  let imageBuffer: Buffer;

  if (metadata.width && metadata.width < minWidth) {
    // Resize or pad to meet minimum width
    imageBuffer = await sharp(filePath)
      .resize({
        width: minWidth,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // white padding
      })
      .toBuffer();
  } else {
    // Use original image
    imageBuffer = fs.readFileSync(filePath);
  }

  // Run OCR
  const result = await Tesseract.recognize(imageBuffer, "eng");
  return result.data.text;
}
app.post("/api/ocr", upload.array("images", 2), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 2) {
      res
        .status(400)
        .json({ message: "Please upload both front and back images." });
    }

    const frontPath = files[0].path;
    const backPath = files[1].path;

    const frontProcessed = "processed_front.jpg";
    const backProcessed = "processed_back.jpg";

    // Preprocess both images
    await Promise.all([
      sharp(frontPath)
        .resize({ width: 1200 })
        .grayscale()
        .normalize()
        .threshold(150)
        .toFile(frontProcessed),

      sharp(backPath)
        .resize({ width: 1200 })
        .grayscale()
        .normalize()
        .threshold(150)
        .toFile(backProcessed),
    ]);

    const worker = await createWorker("eng");
    console.log(backProcessed, backPath);

    const [frontResult, backResult] = await Promise.all([
      worker.recognize(frontProcessed),
      worker.recognize(backProcessed),
    ]);

    await worker.terminate();

    const frontDetail = extractAadhaarInfo(frontResult.data.text);
    const backDetail = extractAadhaarInfo(backResult.data.text);

    res.status(200).json({
      status: true,
      message:"success",
      data: {
        uuid: frontDetail.aadhaarId,
        name: frontDetail.name,
        dob: frontDetail.dob,
        isUidSame:frontDetail.aadhaarId === backDetail.aadhaarId
      },
    });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({ message: "Something went wrong with OCR." });
  }
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
