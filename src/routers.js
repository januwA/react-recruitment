import React from "react";
import Login from "@/pages/login";
import Registered from "@/pages/registered";
import EnterpriseInfo from '@/pages/enterpriseinfo'

const l = console.log;
let routers = [
  {
    path: "/jobSeekerinfo", // 求职者完善信息页面
    component: () => <div>jobSeekerinfo</div>
  },
  {
    path: "/enterpriseinfo", // 企业完善信息页面
    component: EnterpriseInfo
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/registered",
    component: Registered
  }
];

export default routers;
