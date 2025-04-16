import { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import extractAadhaarInfo from "../utils/ExtractAadharInfo";
import extractBackAadhaarInfo from "../utils/ExtractBack";

export const handleOcr = async (req: Request, res: Response): Promise<void> => {
  try {
      const files = req.files as Express.Multer.File[];
      console.log("filex",files)

    if (!files || files.length < 2) {
      res.status(400).json({ message: "Please upload both front and back images." });
      return;
    }

    const frontPath = files[0].path;
    const backPath = files[1].path;

    const worker = await createWorker("eng");

    const [frontResult, backResult] = await Promise.all([
      worker.recognize(frontPath),
      worker.recognize(backPath),
    ]);

    await worker.terminate();

    const frontDetail = extractAadhaarInfo(frontResult.data.text);
    const backDetail = extractBackAadhaarInfo(backResult.data.text);

    if (!frontDetail || !backDetail) {
      res.status(400).json({
        message: `Upload Valid ${!frontDetail ? "Front" : "Rear"} Aadhaar`,
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "success",
      data: {
        uuid: frontDetail.aadhaarId,
        name: frontDetail.name,
        dob: frontDetail.dob,
        address: backDetail.address,
        gender: frontDetail.gender,
        validAadhar: frontDetail.validAadhar,
        isUidSame: frontDetail.aadhaarId === backDetail.aadhaarId,
      },
    });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({ message: "Something went wrong with OCR." });
  }
};
