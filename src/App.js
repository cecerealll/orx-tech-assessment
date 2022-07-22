import { useState, useEffect } from "react";
import Users from "./Users";
import { fetchUsers, fetchTodos } from "./api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [domainFilter, setDomainFilter] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    // users.filter((user) => user.nameincludes(searchInput));
  };

  const handleSelect = (e) => {
    setDomainFilter(e.target.value);
    // users.filter((user) => user.nameincludes(searchInput));
  };

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    (async () => {
      setUsers(await fetchUsers());
      setTodos(await fetchTodos());
    })();
    console.log("useEffect");
  }, []);

  return (
    <div className='App'>
      <input type='text' onChange={handleChange} />
      <select name='' id='' defaultValue onChange={handleSelect}>
        <option value></option>
        <option value='com'>.com</option>
        <option value='net'>.net</option>
        <option value='other'>other</option>
      </select>
      {/* <button >search</button> */}
      <Users
        users={users}
        searchInput={searchInput}
        domainFilter={domainFilter}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        todos={todos}
      />
    </div>
  );
}

export default App;
