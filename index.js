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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
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

app.post("/api/persons", (request, response) => {
  const newContact = request.body
  newContact.id = generateId()
  if (!newContact.name || !newContact.number)
    return response.status(400).send(`name || number not supplied`)

  persons = persons.concat(newContact)
  response.status(201).json(newContact)
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
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.id.params).then((result) => {
    request.status(204).end()
  })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
