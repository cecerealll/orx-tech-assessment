import React from "react";

export default function Users({
    users,
    todos,
    searchInput,
    domainFilter,
    handleCheck,
    handleDelete,
}) {
    const todosByUser = todos.reduce((acc, curr) => {
        return {
            ...acc,
            [curr.userId]: acc[curr.userId]
                ? [...acc[curr.userId], curr]
                : [curr],
        };
    }, {});
    return (
        <div>
            {users
                .filter(
                    ({ name, email }) =>
                        name.toLowerCase().includes(searchInput) ||
                        email.toLowerCase().includes(searchInput)
                )
                .filter(({ website }) => {
                    const splitWebsite = website.toLowerCase().split(".");
                    const tld = splitWebsite[splitWebsite.length - 1];

                    if (domainFilter === "other") {
                        return !tld.includes("net") && !tld.includes("com");
                    }
                    return tld.includes(domainFilter);
                })
                .map(({ id, name, email, phone, address, website }) => {
                    return (
                        <details key={id}>
                            <summary className='title'>{name}</summary>
                            <ul className='user'>
                                <li>{email}</li>
                                <li>{phone}</li>
                                <li>
                                    {address.street}, {address.suite},
                                    {address.city}, {address.zipcode}
                                </li>
                                <li>{website}</li>
                                <li className='metrics'>
                                    <p>
                                        <span className='green'>
                                            completed:
                                        </span>
                                        {todosByUser[id]?.reduce(
                                            (acc, curr) =>
                                                (acc += curr.completed ? 1 : 0),
                                            0
                                        )}
                                    </p>
                                    &nbsp;
                                    <p>
                                        <span className='red'>incomplete:</span>
                                        {todosByUser[id]?.reduce(
                                            (acc, curr) =>
                                                (acc += !curr.completed
                                                    ? 1
                                                    : 0),
                                            0
                                        )}
                                    </p>
                                </li>
                                <li></li>
                            </ul>
                            <div className='todo-list'>
                                {todosByUser[id]?.map(
                                    ({ id: todoId, title, completed }) => {
                                        return (
                                            <div
                                                key={todoId}
                                                className={"todo"}>
                                                <input
                                                    type='checkbox'
                                                    checked={completed}
                                                    onChange={() =>
                                                        handleCheck(todoId)
                                                    }
                                                />
                                                <p>{title}</p>
                                                <button
                                                    className='delete-button'
                                                    onClick={() =>
                                                        handleDelete(todoId)
                                                    }>
                                                    x
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </details>
                    );
                })}
        </div>
    );
}
