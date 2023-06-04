const QrCodeReader = require("qrcode-reader");
const Jimp = require("jimp");
const fs = require("fs");

const scanQrCode = async (filename, outputStream) => {
  try {
    const image = await Jimp.read(filename);
    const qrCodeReader = new QrCodeReader();
    const value = await new Promise((resolve, reject) => {
      qrCodeReader.callback = (error, value) => {
        if (error) {
          reject(error);
        } else if (value && value.result) {
          resolve(value.result);
        } else {
          reject(new Error("QR code value not found"));
        }
      };
      qrCodeReader.decode(image.bitmap);
    });
    const result = `QR code value for ${filename}: ${value}\n`;
    outputStream.write(result);
  } catch (error) {
    console.log(error);
  }
};

const scanQrCodesInDirectory = async (directory, outputStream) => {
  try {
    const files = fs.readdirSync(directory);
    const pngFiles = files.filter((file) => file.endsWith(".png"));
    for (let i = 0; i < pngFiles.length; i++) {
      const filename = `${directory}/${pngFiles[i]}`;
      await scanQrCode(filename, outputStream);
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  // Scan QR code values from PNG files in "qr-codes" directory
  const outputStream = fs.createWriteStream("./qr-code-results.txt");
  await scanQrCodesInDirectory("./special-qr-codes", outputStream);
  outputStream.end();
  console.log("QR code scan results saved to qr-code-results.txt");
})();
