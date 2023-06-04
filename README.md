# qr-batch-scanner
 Read the content of the qr codes in a batch and output to a text file

 ## How to 
 Run the index.js in a node environment

 Change the following code(Ln 43) to select the output text file name and path

 - const outputStream = fs.createWriteStream(```"./qr-code-results.txt"```);

 Change the following code(Ln 44) to select the folder containing the qr files.

 - await scanQrCodesInDirectory(```"./special-qr-codes"```, outputStream);

 Change the following code(Ln 31) to select png or jpg image files

 - const pngFiles = files.filter((file) => file.endsWith(```".png"```));

 ## Dependancies

 - qr-code-reader
 - jimp
 - fs

