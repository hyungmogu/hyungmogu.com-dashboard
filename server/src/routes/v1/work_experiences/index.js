const express = require('express');
const { promise_query, getValueEntries } = require('../../../helpers');

const workExperiencesRouter = express.Router();

workExperiencesRouter.get("/", async (req, res) => {
    const text = "SELECT * FROM work_experiences";
    try {
        const res_work_experiences = await promise_query(text);
        const work_experiences = res_work_experiences.rows;

        for (work_experience of work_experiences) {
            const text_highlights = "SELECT id, detail FROM highlights WHERE work_exp_id = $1";
            const value_highlights = [work_experience.id];

            const text_tech_used = "SELECT id, name FROM tech_used WHERE work_exp_id = $1";
            const value_tech_used = [work_experience.id];

            const res_highlights = await promise_query(text_highlights, value_highlights);
            const highlights = res_highlights.rows;
            const res_tech_used = await promise_query(text_tech_used, value_tech_used);
            const tech_used = res_tech_used.rows;

            work_experience["highlights"] = highlights;
            work_experience["tech_used"] = tech_used;
        }

        res.send(work_experiences);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

workExperiencesRouter.post("/", async (req, res) => {
    let work_experience, highlights, tech_used;
    try {

        const text_work_experience = `
            INSERT INTO work_experiences(company, date_start, date_end, location, position, user_id)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const value_work_experience = [
            req.body.company, req.body.date_start,
            req.body.date_end, req.body.location,
            req.body.position, 1
        ];
        const res_work_experience = await promise_query(text_work_experience, value_work_experience);
        work_experience = res_work_experience.rows[0];

        if (req.body.highlights.length > 0) {
            const text_highlights = `
                INSERT INTO highlights(detail, work_exp_id)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;

            let value_highlights = [];
            for (let item of req.body.highlights) {
                value_highlights.push(item.detail);
                value_highlights.push(work_experience.id);
            };
            const res_highlights = await promise_query(text_highlights, value_highlights);
            highlights = res_highlights.rows;
        }

        if (req.body.tech_used.length > 0) {
            const text_tech_used = `
                INSERT INTO tech_used(name, work_exp_id)
                VALUES ${getValueEntries(req.body.tech_used.length)}
                RETURNING *
            `;
            let value_tech_used = [];
            for (let item of req.body.tech_used) {
                value_tech_used.push(item.name);
                value_tech_used.push(work_experience.id);
            };
            const res_tech_used = await promise_query(text_tech_used, value_tech_used);
            tech_used = res_tech_used.rows;
        }

        let final = Object.assign({}, work_experience);
        final["highlights"] = highlights;
        final["tech_used"] = tech_used;

        res.status(201).send(final);

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


workExperiencesRouter.get("/:id", async (req, res) => {
    const text = "SELECT * FROM work_experiences WHERE id = $1";
    const value = [req.params.id];

    try {
        const res_work_exp = await promise_query(text, value);
        let work_exp = res_work_exp.rows[0];

        const text_highlights = "SELECT id, detail FROM highlights WHERE work_exp_id = $1";
        const value_highlights = [work_exp.id];

        const text_tech_used = "SELECT id, name FROM tech_used WHERE work_exp_id = $1";
        const value_tech_used = [work_exp.id];

        const res_highlights = await promise_query(text_highlights, value_highlights);
        const highlights = res_highlights.rows;
        const res_tech_used = await promise_query(text_tech_used, value_tech_used);
        const tech_used = res_tech_used.rows;

        work_exp["highlights"] = highlights;
        work_exp["tech_used"] = tech_used;

        res.send(work_exp);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

workExperiencesRouter.put("/:id", async (req, res) => {
    let new_highlights = [];
    let new_tech_used = [];

    try{
        const text_project = `
            UPDATE work_experiences
            SET (company, date_start, date_end, location) = ($1, $2, $3, $4)
            WHERE id = $5 RETURNING *
        `;

        const value_project = [
            req.body.company, req.body.date_start,
            req.body.date_end, req.body.location,
            req.params.id
        ];

        const res_work_experience = await promise_query(text_project, value_project);
        let work_experience = res_work_experience.rows[0];

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
                        INSERT INTO highlights(detail, work_exp_id)
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

        if (req.body.tech_used && Array.isArray(req.body.tech_used)) {
            for (let tech of req.body.tech_used) {
                if (tech.id) {
                    const text_tech = `
                        UPDATE tech_used
                        SET (name) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_tech = [tech.name, tech.id];

                    const res_tech = await promise_query(text_tech, value_tech);
                    tech = res_tech.rows[0];
                } else {
                    const text_tech = `
                        INSERT INTO tech_used(name, work_exp_id)
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

        work_experience["highlights"] = new_highlights;
        work_experience["tech_used"] = new_tech_used;

        res.status(200).send(work_experience);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

workExperiencesRouter.delete("/:id", async (req, res) => {
    const text_work_experience = "DELETE FROM work_experiences WHERE id = $1";
    const value_work_experience = [req.params.id];
    try{
        await promise_query(text_work_experience, value_work_experience);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

workExperiencesRouter.delete("/highlights/:id", async (req, res) => {
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

workExperiencesRouter.delete("/techs-used/:id", async (req, res) => {
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


module.exports = workExperiencesRouter;