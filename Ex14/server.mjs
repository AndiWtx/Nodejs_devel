import { getAll, getOneById, create, updateById, deleteById } from './controller.mjs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api/planets', getAll)

app.get('/api/planets/:id', getOneById)

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

app.listen(port, () => {
  console.log(`example on http://localhost:${port}/api/planets`)
}) 