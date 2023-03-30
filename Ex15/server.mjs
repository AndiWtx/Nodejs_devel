import { getAll, getOneById, create, updateById, deleteById, uploadImageById } from './controller.mjs';
import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./Nodejs_devel/Ex15/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api/planets', getAll)

app.get('/api/planets/:id', getOneById)

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

app.post('/api/planets/:id/image', upload.single("image"), uploadImageById)

app.listen(port, () => {
  console.log(`example on http://localhost:${port}/api/planets`)
}) 