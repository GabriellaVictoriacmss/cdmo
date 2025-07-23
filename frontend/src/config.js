// src/config.js

export const users = [
  {
    username: "admin",
    password: "admin2819",
    isAdmin: true,
    name: "Pedro",

  },
  {
    username: "sknsasa",
    password: "sasa123",
    isAdmin: false,
    name: "sknsasa",
   
  }
];

export const isAdmin = () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  return user?.isAdmin === true;
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('currentUser'));
};