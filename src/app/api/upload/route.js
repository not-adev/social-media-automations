import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
export async function POST(req) {
  console.log('upload imge on local hit')
  const formData = await req.formData();
  const file = formData.get("file");
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "upload");
  if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const uniqueName = `${randomUUID()}-${file.name}`
  const publicUrl = path.join(uploadDir, uniqueName)
  fs.writeFileSync(path.join(uploadDir, uniqueName), buffer);
  return Response.json({ message: "File uploaded", localPath:publicUrl });
}
