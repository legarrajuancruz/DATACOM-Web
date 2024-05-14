import { Router } from "express";
import { generatePDF } from "../utils.js";

const PDFkit = Router();

PDFkit.post("/generar-pdf", async (req, res) => {
  try {
    let htmlContent = req.body;

    // Modificar las rutas de las imágenes a URL absoluta
    htmlContent = htmlContent.replace(
      /<img[^>]*src="([^"]*)"[^>]*>/g,
      (match, src) => {
        // Reemplazar rutas relativas con rutas absolutas
        if (!src.startsWith("http")) {
          const absoluteSrc = `http://${req.headers.host}/${src}`;
          return match.replace(src, absoluteSrc);
        }
        return match;
      }
    );

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
