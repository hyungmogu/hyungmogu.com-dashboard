const express = require('express');
const { promise_query, getValueEntries } = require('../../../helpers');

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
    const text = "SELECT * FROM projects";
    try {
        const res_projects = await promise_query(text);
        const projects = res_projects.rows;

        for (project of projects) {
            const text_highlights = "SELECT id, detail FROM highlights WHERE project_id = $1";
            const value_highlights = [project.id];

            const text_images = "SELECT id, url FROM images WHERE project_id = $1";
            const value_images = [project.id];

            const text_tech_used = "SELECT id, name FROM tech_used WHERE project_id = $1";
            const value_tech_used = [project.id];

            const res_highlights = await promise_query(text_highlights, value_highlights);
            const highlights = res_highlights.rows;
            const res_images = await promise_query(text_images, value_images);
            const images = res_images.rows;
            const res_tech_used = await promise_query(text_tech_used, value_tech_used);
            const tech_used = res_tech_used.rows;

            project["highlights"] = highlights;
            project["images"] = images;
            project["tech_used"] = tech_used;
        }

        res.send(projects);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.post("/", async (req, res) => {
    let project, highlights, images, tech_used;
    try {
        const text_project = `
            INSERT INTO projects(title, date, short_description, header_image_url,
                                 demo_url, source_url, user_id)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const value_project = [
            req.body.title, req.body.date,
            req.body.short_description, req.body.header_image_url,
            req.body.demo_url, req.body.source_url, 1
        ];

        const res_project = await promise_query(text_project, value_project);
        project = res_project.rows[0];

        if (req.body.highlights.length > 0) {
            const text_highlights = `
                INSERT INTO highlights(detail, project_id)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;

            let value_highlights = [];
            for (let item of req.body.highlights) {
                value_highlights.push(item.detail);
                value_highlights.push(project.id);
            };
            const res_highlights = await promise_query(text_highlights, value_highlights);
            highlights = res_highlights.rows;
        }

        if (req.body.tech_used.length > 0) {
            const text_tech_used = `
                INSERT INTO tech_used(name, project_id)
                VALUES ${getValueEntries(req.body.tech_used.length)}
                RETURNING *
            `;
            let value_tech_used = [];
            for (let item of req.body.tech_used) {
                value_tech_used.push(item.name);
                value_tech_used.push(project.id);
            };
            const res_tech_used = await promise_query(text_tech_used, value_tech_used);
            tech_used = res_tech_used.rows;
        }

        if (req.body.images.length > 0) {
            const text_images = `
                INSERT INTO images(url, project_id)
                VALUES ${getValueEntries(req.body.images.length)}
                RETURNING *
            `;
            let value_images = [];
            for (let item of req.body.images) {
                value_images.push(item.url);
                value_images.push(project.id);
            };
            const res_images = await promise_query(text_images, value_images);
            images = res_images.rows;
        }

        let final = Object.assign({}, project);
        final["highlights"] = highlights;
        final["tech_used"] = tech_used;
        final["images"] = images;

        res.status(201).send(final);

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.get("/", async (req, res) => {
    const text = "SELECT * FROM projects";
    try {
        const res_projects = await promise_query(text);
        const projects = res_projects.rows;

        for (project of projects) {
            const text_highlights = "SELECT id, detail FROM highlights WHERE project_id = $1";
            const value_highlights = [project.id];

            const text_images = "SELECT id, url FROM images WHERE project_id = $1";
            const value_images = [project.id];

            const text_tech_used = "SELECT id, name FROM tech_used WHERE project_id = $1";
            const value_tech_used = [project.id];

            const res_highlights = await promise_query(text_highlights, value_highlights);
            const highlights = res_highlights.rows;
            const res_images = await promise_query(text_images, value_images);
            const images = res_images.rows;
            const res_tech_used = await promise_query(text_tech_used, value_tech_used);
            const tech_used = res_tech_used.rows;

            project["highlights"] = highlights;
            project["images"] = images;
            project["tech_used"] = tech_used;
        }

        res.send(projects);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


projectsRouter.get("/:id", async (req, res) => {
    const text = "SELECT * FROM projects WHERE id = $1";
    const value = [req.params.id];

    try {
        const res_projects = await promise_query(text, value);
        let project = res_projects.rows[0];

        const text_highlights = "SELECT id, detail FROM highlights WHERE project_id = $1";
        const value_highlights = [project.id];

        const text_images = "SELECT id, url FROM images WHERE project_id = $1";
        const value_images = [project.id];

        const text_tech_used = "SELECT id, name FROM tech_used WHERE project_id = $1";
        const value_tech_used = [project.id];

        const res_highlights = await promise_query(text_highlights, value_highlights);
        const highlights = res_highlights.rows;
        const res_images = await promise_query(text_images, value_images);
        const images = res_images.rows;
        const res_tech_used = await promise_query(text_tech_used, value_tech_used);
        const tech_used = res_tech_used.rows;

        project["highlights"] = highlights;
        project["images"] = images;
        project["tech_used"] = tech_used;

        res.send(project);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.put("/:id", async (req, res) => {
    let new_highlights = [];
    let new_images = [];
    let new_tech_used = [];

    try{
        const text_project = `
            UPDATE projects
            SET (title, date, short_description, header_image_url, demo_url, source_url) = ($1, $2, $3, $4, $5, $6)
            WHERE id = $7 RETURNING *
        `;

        const value_project = [
            req.body.title, req.body.date,
            req.body.short_description, req.body.header_image_url,
            req.body.demo_url, req.body.source_url, req.params.id
        ];

        const res_project = await promise_query(text_project, value_project);
        let project = res_project.rows[0];

        if (req.body.highlights && Array.isArray(req.body.highlights)) {
            for (let highlight of req.body.highlights) {
                if (highlight.id) {
                    const text_highlight = `
                        UPDATE highlights
                        SET (detail) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_highlight = [highlight.detail, highlight.id];

                    const res_highlight = await promise_query(text_highlight, value_highlight);
                    highlight = res_highlight.rows[0];

                } else {
                    const text_highlight = `
                        INSERT INTO highlights(detail, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_highlight = [highlight.detail, req.params.id];

                    const res_highlight = await promise_query(text_highlight, value_highlight);
                    highlight = res_highlight.rows[0];
                }
                new_highlights.push(highlight);
            }
        }

        if (req.body.images && Array.isArray(req.body.images)) {
            for (let image of req.body.images) {
                if (image.id) {
                    const text_image = `
                        UPDATE images
                        SET (url) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_image = [image.url, image.id];

                    const res_image = await promise_query(text_image, value_image);
                    image = res_image.rows[0];
                } else {
                    const text_image = `
                        INSERT INTO images(url, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_image = [image.url, req.params.id];

                    const res_image = await promise_query(text_image, value_image);
                    image = res_image.rows[0];
                }
                new_images.push(image);
            }
        }

        if (req.body.tech_used && Array.isArray(req.body.tech_used)) {
            for (let tech of req.body.tech_used) {
                if (tech.id) {
                    // update
                    const text_tech = `
                        UPDATE tech_used
                        SET (name) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_tech = [tech.name, tech.id];

                    const res_tech = await promise_query(text_tech, value_tech);
                    tech = res_tech.rows[0];
                } else {
                    // post
                    const text_tech = `
                        INSERT INTO tech_used(name, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_tech = [tech.name, req.params.id];

                    const res_tech = await promise_query(text_tech, value_tech);
                    tech = res_tech.rows[0];
                }
                new_tech_used.push(tech);
            }
        }

        project["highlights"] = new_highlights;
        project["tech_used"] = new_tech_used;
        project["images"] = new_images;

        res.status(200).send(project);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.delete("/:id", async (req, res) => {
    const text_project = "DELETE FROM projects WHERE id = $1";
    const value_project = [req.params.id];
    try{
        await promise_query(text_project, value_project);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.delete("/highlights/:id", async (req, res) => {
    const text_highlight = "DELETE FROM highlights WHERE id = $1";
    const value_highlight = [req.params.id];
    try{
        await promise_query(text_highlight, value_highlight);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

projectsRouter.delete("/images/:id", async (req, res) => {
    const text_images = "DELETE FROM images WHERE id = $1";
    const value_images = [req.params.id];
    try{
        await promise_query(text_images, value_images);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


projectsRouter.delete("/techs-used/:id", async (req, res) => {
    const text_tech_used = "DELETE FROM tech_used WHERE id = $1";
    const value_tech_used = [req.params.id];
    try{
        await promise_query(text_tech_used, value_tech_used);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = projectsRouter;