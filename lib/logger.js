import fs from 'fs';
import path from 'path';

export function saveJsonToFile(filename, jsonObject) {
  try {
    const logDir = path.join(process.cwd(), 'webhook_logs');

    // Create folder if missing
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const filePath = path.join(logDir, filename);

    // Save pretty JSON
    fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2), 'utf8');

    console.log(`Saved JSON file → ${filePath}`);
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
}
