const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const glbPath = path.join(__dirname, "character.glb");
const encPath = path.join(__dirname, "character.enc");

if (!fs.existsSync(glbPath)) {
  console.error("character.glb not found at", glbPath);
  process.exit(1);
}

const encryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile);

  output.write(iv);
  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    console.log("Successfully encrypted character.glb -> character.enc!");
    console.log("The site will now use the updated model.");
  });
};

encryptFile(glbPath, encPath, "MyCharacter12");
