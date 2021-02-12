const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let persons = [
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
  console.log(person);
  response.json(person).status(204).end();
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
