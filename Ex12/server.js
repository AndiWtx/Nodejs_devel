const express = require('express')

const app = express()
const port = process.env.PORT || 3000



let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  }
];

app.use(express.json())

app.get('/api/planets', (req, res) => {
  res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
  const { id } = req.params
  const planet = planets.find(p => p.id == id)
  res.status(200).json(planet)
})

app.post('/api/planets', (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  console.log(planets);

  res.status(201).json({ msg: "the planet was created" });
})

app.put('/api/planets/:id', (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  planets = planets.map(p => p.id === id ? ({ ...p, name }) : p);

  console.log(planets);

  res.status(200).json({ msg: "the planet was updated" })
})

app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.body;
  planets = planets.filter(p => p.id !== id);

  res.status(200).json({ msg: "the planet was deleted" })
})

app.listen(port, () => {
  console.log(`example on http://localhost:${port}/api/planets`)
}) 