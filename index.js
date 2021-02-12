const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.disable("x-powered by");

const generateId = () =>
  persons.length > 0 ? Math.random().toString(36).substring(2, 7) : 1;

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
    name: "name",
    number: "222736237676236",
    id: 7,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  return;
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((person) => {
    return person.id !== id;
  });
  response.json(person).status(204).end();
});

app.post("/api/persons", (request, response) => {
  const newContact = request.body;
  newContact.id = generateId();
  if (!newContact.name || !newContact.number)
    return response.status(400).send(`name || number not supplied`);
  const contactExist = persons.some(
    (person) => person.name === newContact.name
  );
  if (contactExist)
    return response.status(400).send(`${newContact.name} already exist`);

  persons = persons.concat(newContact);
  response.send(newContact);
});

app.get("/info", (request, response) => {
  const date = new Date().toLocaleString();
  const created = new Date(Date.now());
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  response.send(
    ` <div>
          <p>Phonebook has info for ${persons.length} people</p>
      
      
          ${timeZone} ${date} ${created} 
      </div>`
  );
});

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
