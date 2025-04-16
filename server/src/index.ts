import express from "express";
import cors from "cors";
import ocrRoutes from "./routes/ocrRoutes";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ocr", ocrRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});















// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import Tesseract, { createWorker } from "tesseract.js";
// import extractAadhaarInfo from "./utils/ExtractAadharInfo";
// import extractBackAadhaarInfo from "./utils/ExtractBack";

// const app = express();

// app.use(cors());
// app.use(express.json());

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (_, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// app.post("/api/ocr", upload.array("images", 2), async (req, res) => {
//   try {
//     const files = req.files as Express.Multer.File[];

//     if (!files || files.length < 2) {
//       res
//         .status(400)
//         .json({ message: "Please upload both front and back images." });
//     }

//     const frontPath = files[0].path;
//     const backPath = files[1].path;

//     const worker = await createWorker("eng");

//     const [frontResult, backResult] = await Promise.all([
//       worker.recognize(frontPath),
//       worker.recognize(backPath),
//     ]);

//     await worker.terminate();

//     const frontDetail = extractAadhaarInfo(frontResult.data.text);
//     const backDetail = extractBackAadhaarInfo(backResult.data.text);
//     console.log(frontDetail);

//     if (!frontDetail || !backDetail) {
//       res
//         .status(400)
//         .json({
//           message: `Upload Valid ${!frontDetail ? "Front" : "Rear"} Aadhaar`,
//         });
//       return;
//     }
//     res.status(200).json({
//       status: true,
//       message: "success",
//       data: {
//         uuid: frontDetail.aadhaarId,
//         name: frontDetail.name,
//         dob: frontDetail.dob,
//         address: backDetail.address,
//         gender: frontDetail.gender,
//         validAadhar: frontDetail.validAadhar,
//         isUidSame: frontDetail.aadhaarId === backDetail.aadhaarId,
//       },
//     });
//   } catch (error) {
//     console.error("OCR error:", error);
//     res.status(500).json({ message: "Something went wrong with OCR." });
//   }
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`server listen on port ${port}`);
// });
