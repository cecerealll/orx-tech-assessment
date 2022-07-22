export const fetchUsers = () => {
    return fetch("https://jsonplaceholder.typicode.com/users").then((resp) =>
        resp.json()
    );
};

export const fetchTodos = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((resp) =>
        resp.json()
    );
};
