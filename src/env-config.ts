console.log("process.env");
console.log(process.env);

const config = {
  apiUrl: process.env.REACT_APP_API_URL,
};

export { config };
