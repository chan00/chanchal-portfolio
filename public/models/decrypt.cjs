const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const encPath = path.join(__dirname, "character.enc");
const glbPath = path.join(__dirname, "character.glb");

if (!fs.existsSync(encPath)) {
  console.error("character.enc not found at", encPath);
  process.exit(1);
}

const data = fs.readFileSync(encPath);
const iv = data.subarray(0, 16);
const encrypted = data.subarray(16);
const key = crypto.createHash("sha256").update("MyCharacter12").digest();
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

fs.writeFileSync(glbPath, decrypted);
console.log(`Successfully extracted character.glb (${(decrypted.length / 1024 / 1024).toFixed(2)} MB)!`);
console.log("You can now open and edit character.glb in Blender, Maya, or 3ds Max.");
