import React from 'react'
import Login from '@/pages/login'
import Registered from '@/pages/registered'

const l = console.log;
let routers = [
  {
    path: '/boss', component: () => <div>boss</div>
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/registered', component: Registered
  }
];

export default routers