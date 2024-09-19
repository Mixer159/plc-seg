import fs from "fs";
import path from "path";

export default function handler(req, res) {
  console.log("API route accessed");

  const pagesDirectory = path.join(process.cwd(), "src/pages");
  console.log("Pages directory:", pagesDirectory);

  const files = fs.readdirSync(pagesDirectory);
  console.log("Files in pages directory:", files);

  const hodinaPages = files
    .filter((file) => file.startsWith("hodina") && file.endsWith(".tsx"))
    .map((file) => parseInt(file.replace("hodina", "").replace(".tsx", "")))
    .sort((a, b) => a - b);

  console.log("Hodina pages:", hodinaPages);

  res.status(200).json(hodinaPages);
}
