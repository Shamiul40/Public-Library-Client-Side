import React from 'react';

import { Outlet } from 'react-router';


const Authlayout = () => {
  return (
    <>
     
      <main>
        <Outlet></Outlet>
      </main>
     
    </>
  );
};

export default Authlayout;