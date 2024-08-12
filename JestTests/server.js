const { app } = require("./index");

let PORT = 3000;
app.listen(PORT, () =>
  console.log(`dev/prod server is running on port ${PORT}`),
);
