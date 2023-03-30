import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:Curva@localhost:5432")

// console.log(db)

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );`);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)


  const planets = await db.many(`SELECT * FROM planets`)

  console.log(planets)
}

setupDb();




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


export {
  getAll, getOneById, create, updateById, deleteById
}