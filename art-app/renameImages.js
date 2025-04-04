// The script recursively scans all directories under public/art-images/.
// It removes all leading zeros from the filenames using a regex: .replace(/^0+/, '').

import { readdir, stat, rename } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Root directory of your images folder
const rootDir = join(__dirname, 'public/art-images');

// Function to recursively process folders
async function processDirectory(directoryPath) {
    try {
        const files = await readdir(directoryPath);

        for (const file of files) {
            const filePath = join(directoryPath, file);

            try {
                const stats = await stat(filePath);

                if (stats.isDirectory()) {
                    // Recursively process subdirectories
                    await processDirectory(filePath);
                } else {
                    // Remove leading zeros from the file name
                    const newFileName = file.replace(/^0+/, '');
                    const newFilePath = join(directoryPath, newFileName);

                    // Rename the file if the name has changed
                    if (newFileName !== file) {
                        await rename(filePath, newFilePath);
                        console.log(`Renamed: ${filePath} -> ${newFilePath}`);
                    }
                }
            } catch (err) {
                console.error(`Error reading file: ${filePath}`, err);
            }
        }
    } catch (err) {
        console.error(`Error reading directory: ${directoryPath}`, err);
    }
}

// Start the process from the root directory
processDirectory(rootDir);
