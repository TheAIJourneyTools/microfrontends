import React from 'react';
import RemoteDashboard from 'remote/dashboard-main';
import ProfileDashboard from 'remote/profile-main';

export default async function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 min-h-screen py-2 h-screen'>
      <h1>HOST</h1>
      <RemoteDashboard />
      <ProfileDashboard />
    </div>
  );
}
