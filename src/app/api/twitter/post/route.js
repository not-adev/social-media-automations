import formidable from 'formidable';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req ,res) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parsing failed' });

    const { datetime, content, hashtags } = fields;
    const file = files.file;

    if (!file || Array.isArray(file)) return res.status(400).json({ error: 'Invalid file' });

    const fileStream = fs.createReadStream(file.filepath);

    console.log('Fields:', fields);
    console.log('File:', file);

    // 🔁 Upload to Twitter API here...

    return NextResponse.json({ message: 'Post scheduled successfully' });
  });
}