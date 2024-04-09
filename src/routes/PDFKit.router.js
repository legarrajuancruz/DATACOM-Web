import { Router } from "express";
import { generatePDF } from "../utils.js";

const PDFkit = Router();

PDFkit.post("/generar-pdf", async (req, res) => {
  try {
    const htmlContent = req.body;
    const pdfBuffer = await generatePDF(htmlContent);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=example.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default PDFkit;
