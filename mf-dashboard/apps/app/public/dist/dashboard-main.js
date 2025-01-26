import React from 'react';
export default function Dashboard() {
    return (React.createElement("div", { className: 'border border-primary p-3 ' },
        React.createElement("h2", { className: 'text-primary text-2xl' }, "Dashboard from Public Components"),
        React.createElement("p", null, "This content is shared across different apps."),
        React.createElement("button", { className: 'btn btn-primary bg-gray-500 text-white mt-3 p-3 rounded' }, "Click me")));
}
