import express from "express";
// const path = require('path')
const app = express();

app.use(express.static("public"));

const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://3.220.226.106:${PORT}`);
});
