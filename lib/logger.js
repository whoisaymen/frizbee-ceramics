import fs from "fs";
import path from "path";

export function writeLog(message, data = null) {
  const timestamp = new Date().toISOString();

  const logLine =
    `\n[${timestamp}] ${message}` +
    (data ? ` | ${JSON.stringify(data, null, 2)}` : "");

  const logsDir = path.join(process.cwd(), "logs");

  if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
  }

  fs.appendFileSync(path.join(logsDir, "webhooks.log"), logLine);
  // Always log to console (works on Vercel)
  console.log(logLine);
}
