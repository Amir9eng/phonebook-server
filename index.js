require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const Person = require("./models/person")
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.json)
app.use(cors())
morgan.token("body", (req, res) => JSON.stringify(req.body))

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.use(express.static("build"))

app.disable("x-powered by")

const generateId = () =>
  persons.length > 0 ? Math.random().toString(36).substring(2, 7) : 1

let persons = [
  {
    name: "Gordon Levitt",
    number: "45-88-9343892",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "John",
    number: "1234543",
    id: 5,
  },
  {
    name: "naruto",
    number: "222736237676236",
    id: 7,
  },
]

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch(next)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  return
})

app.delete("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id
  try {
    await Person.findByIdAndDelete({ _id, id })
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post("/api/persons", async (request, response, next) => {
  const newContact = request.body
  newContact.id = generateId()
  if (!newContact.name || !newContact.number)
    return response.status(400).send(`name || number not supplied`)
  try {
    const nameExist = await Person.findOne({ name: newContact.name })
    const numberExist = await Person.findOne({ number: newContact.number })
    if (nameExist && numberExist)
      return response.status(409).json({ error: "duplicate entry" })

    const newPerson = await new Person({
      name: newContact.name,
      number: newContact.number,
    }).save()
    response.status(201).json(newPerson)
  } catch (error) {
    console.log(error)
  }
})

app.get("/info", (request, response) => {
  const date = new Date().toLocaleString()
  const created = new Date(Date.now())
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  response.send(
    ` <div>
          <p>Phonebook has info for ${persons.length} people</p>
      
      
          ${timeZone} ${date} ${created} 
      </div>`
  )
})
app.put("api/person/:id", async (request, response, next) => {
  const body = request.body
  const person = {
    name = body.name,
    number= body.number
  }
  if(!body.name  && !body.number)
  return response.status(400).json({error: '"name" or "number" is required'})
  try{
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
    response.json(person)
  } catch(err) {
    next(err)
  } 
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
