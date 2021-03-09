const express = require("express");
const body_parser = require('body-parser');
const projectsRouter = require("./src/routes/v1/projects");
const workExperiencesRouter = require("./src/routes/v1/work_experiences");
const infoRouter = require("./src/routes/v1/info");

const app = express();
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(body_parser.json());
app.use('/admin/projects', projectsRouter);
app.use('/admin/work-experiences', workExperiencesRouter);
app.use('/admin/info', infoRouter);