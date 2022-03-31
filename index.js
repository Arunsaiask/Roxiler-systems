import express from "express";
/// third party library for requests sending to api
import axios from "axios";
const PORT = 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running succesfully");
});

//description GET todos without userId
//route       "/todos" GET request
/// to get the data of todos without userId field
app.get("/todos", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const { data } = await axios.get(url);

  ///using for each method
  // data.forEach((object) => {
  //   delete object["userId"];
  // });
  // res.json(data);

  // using the map method
  const objectswithoutId = [];
  data.map((object) =>
    objectswithoutId.push({
      id: object.id,
      title: object.title,
      completed: object.completed,
    })
  );
  res.json(objectswithoutId);
});

//description GET userDetails along with todos of that particular user
//route       "/user/:id" GET request with id as params
app.get("/user/:id", async (req, res) => {
  // to get data from api of userInfo
  const url = `https://jsonplaceholder.typicode.com/users/${req.params.id}`;
  const { data } = await axios.get(url);

  // to get todos
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos = response.data;

  const id = req.params.id;

  var objectToMix = [];

  todos.map((todo) => {
    if (todo.userId == id) {
      return objectToMix.push(todo);
    }
  });

  const userWithTodos = { ...data, todos: [...objectToMix] };
  res.json(userWithTodos);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
