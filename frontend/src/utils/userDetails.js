const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
export const username = loginInfo.name;
export const email = loginInfo.email;
