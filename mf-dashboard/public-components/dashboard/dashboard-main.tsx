import React from 'react';

export default function Dashboard() {
  return (
    <div className='border border-primary p-3 '>
      <h2 className='text-primary text-2xl'>
        Dashboard from Public Components
      </h2>
      <p>This content is shared across different apps.</p>
      <button className='btn btn-primary bg-gray-500 text-white mt-3 p-3 rounded'>Click me</button>
    </div>
  );
}
