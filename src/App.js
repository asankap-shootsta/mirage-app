import React, { useState, useEffect } from "react"
import { createServer } from "miragejs"
import './App.css';

const urlPrefix = 'https://jsonplaceholder.typicode.com';

createServer({
  routes() {
    this.urlPrefix = urlPrefix;
    // this.namespace = "/api";
    this.get("fake-users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ]);
    this.passthrough();
  },
})

export function App() {
  let [users, setUsers] = useState([])
  let [fakeUsers, setFakeUsers] = useState([])

  useEffect(() => {
    // Querying real users
    fetch(`${urlPrefix}/users`)
      .then((response) => response.json())
      .then((json) => setUsers(json))

    // Querying fake users
    fetch(`${urlPrefix}/fake-users`)
      .then((response) => response.json())
      .then((json) => setFakeUsers(json))
  }, [])

  return (
    <>
      {/* Displaying real users */}
      <div><strong>Real Users</strong></div>
      <ul>
      {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* Displaying fake users */}
      <div><strong>Fake Users</strong></div>
      <ul>
      {fakeUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App;
