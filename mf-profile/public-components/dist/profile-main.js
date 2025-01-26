import React from 'react';
export default function Profile() {
    return (React.createElement("div", { className: 'p-8 bg-gray-100' },
        React.createElement("h2", { className: 'text-2xl' }, "Profile from Public Components"),
        React.createElement("p", { className: 'mt-4' }, "This content is shared across different apps.")));
}
