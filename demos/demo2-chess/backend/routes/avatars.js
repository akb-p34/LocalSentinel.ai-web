import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// VULNERABILITY: No file type validation!
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // VULNERABILITY: No directory traversal protection
  },
  filename: (req, file, cb) => {
    // VULNERABILITY: Using original filename without sanitization
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // VULNERABILITY: 100MB limit is too high
  },
  fileFilter: (req, file, cb) => {
    // VULNERABILITY: No actual file type checking!
    cb(null, true) // Accept everything!
  }
})

// Upload avatar endpoint
router.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // VULNERABILITY: No file content validation
    // Could upload .js, .exe, .php files!
    console.log('File uploaded:', req.file)

    // VULNERABILITY: Returning full file path
    res.json({
      success: true,
      filename: req.file.filename,
      path: req.file.path, // VULNERABILITY: Exposing server paths
      size: req.file.size,
      mimetype: req.file.mimetype,
      // VULNERABILITY: Executing uploaded files
      url: `/uploads/${req.file.filename}` // Files served directly!
    })

  } catch (error) {
    res.status(500).json({
      error: 'Upload failed',
      details: error.message // VULNERABILITY: Error details exposure
    })
  }
})

// VULNERABILITY: Directory listing enabled
router.get('/list', (req, res) => {
  const uploadsDir = 'uploads/'
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    // VULNERABILITY: Exposing all uploaded files
    const fileList = files.map(file => ({
      name: file,
      path: path.join(uploadsDir, file),
      stats: fs.statSync(path.join(uploadsDir, file))
    }))

    res.json(fileList)
  })
})

// VULNERABILITY: File download without auth
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename
  // VULNERABILITY: Path traversal attack possible
  const filepath = path.join('uploads', filename)
  
  // VULNERABILITY: No access control
  res.download(filepath)
})

export default router