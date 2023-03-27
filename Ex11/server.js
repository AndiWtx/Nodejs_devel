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
  },
];



app.get('/api/planets', (req, res) => {
  res.json(planets)
})

app.get('/api/planets/:id', (req, res) => {
  const { id } = req.params
  const planet = planets.find(p => p.id == id)
  res.json(planet)
})

app.listen(port, () => {
  console.log(`example on localhost:${port}`)
}) 