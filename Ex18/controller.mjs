import { db } from "./db.mjs";


const getAll = async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets`)
  res.status(200).json(planets)
}

const getOneById = async (req, res) => {
  const { id } = req.params
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, id)
  res.status(200).json(planet)
}

const create = async (req, res) => {
  const { name } = req.body;
  console.log(req.body)
  console.log(name)
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)


  res.status(201).json({ msg: "the planet was created" });
}

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
  res.status(200).json({ msg: "the planet was updated" })
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, id)
  res.status(200).json({ msg: "the planet was deleted" })
}

const uploadImageById = async (req, res) => {
  const { id } = req.params
  const fileName = req.file?.path

  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
    res.status(201).json({ msg: " the image was created" })
  } else {
    res.status(400).json({ msg: " the image failed to upload" })
  }

}


export {
  getAll, getOneById, create, updateById, deleteById, uploadImageById
}