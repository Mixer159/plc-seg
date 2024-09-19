import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const pagesDirectory = path.join(process.cwd(), "src/pages");
  const files = fs.readdirSync(pagesDirectory);
  const hodinaPages = files
    .filter((file) => file.startsWith("hodina") && file.endsWith(".tsx"))
    .map((file) => parseInt(file.replace("hodina", "").replace(".tsx", "")))
    .sort((a, b) => a - b);

  res.status(200).json(hodinaPages);
}
