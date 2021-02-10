const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let contacts = [
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
  response.json(contacts);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
});

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
