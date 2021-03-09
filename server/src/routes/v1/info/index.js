const express = require('express');
const { promise_query } = require('../../../helpers');

const infoRouter = express.Router();

infoRouter.get("/", async (req, res) => {
    const text = "SELECT * FROM user_self";
    try {
        const res_user = await promise_query(text);
        let user = res_user.rows[0];

        const text_contacts = "SELECT id, name, value FROM contacts WHERE user_id = 1";
        const text_socials = "SELECT id, name, value FROM socials WHERE user_id = 1";

        const res_contacts = await promise_query(text_contacts);
        const contacts = res_contacts.rows;
        const res_socials = await promise_query(text_socials);
        const socials = res_socials.rows;

        user["contacts"] = contacts;
        user["socials"] = socials;

        res.send(user);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

infoRouter.put("/", async (req, res) => {
    let new_contacts = [];
    let new_socials = [];

    try{
        const text_user = `
            UPDATE user_self
            SET (first_name, last_name, nick_name) = ($1, $2, $3)
            WHERE id = 1 RETURNING *
        `;
        const value_user = [
            req.body.first_name, req.body.last_name,
            req.body.nick_name
        ];

        const res_user = await promise_query(text_user, value_user);
        let user = res_user.rows[0];

        if (req.body.contacts && Array.isArray(req.body.contacts)) {
            for (let contact of req.body.contacts) {
                if (contact.id) {
                    const text_contact = `
                        UPDATE contacts
                        SET (name, value) = ROW($1, $2)
                        WHERE id = $3 RETURNING *
                    `;

                    let value_contact = [contact.name, contact.value, contact.id];

                    const res_contact = await promise_query(text_contact, value_contact);
                    contact = res_contact.rows[0];

                } else {
                    const text_contact = `
                        INSERT INTO contacts(name, value, user_id)
                        VALUES ($1, $2, $3)
                        RETURNING *
                    `;

                    let value_contact = [contact.name, contact.value, 1];

                    const res_contact = await promise_query(text_contact, value_contact);
                    contact = res_contact.rows[0];
                }
                new_contacts.push(contact);
            }
        }

        if (req.body.socials && Array.isArray(req.body.socials)) {
            for (let social of req.body.socials) {
                if (social.id) {
                    const text_social = `
                        UPDATE socials
                        SET (name, value) = ROW($1, $2)
                        WHERE id = $3 RETURNING *
                    `;

                    let value_social = [social.name, social.value, social.id];

                    const res_social = await promise_query(text_social, value_social);
                    social = res_social.rows[0];
                } else {
                    const text_social = `
                        INSERT INTO socials(name, value, user_id)
                        VALUES ($1, $2, $3)
                        RETURNING *
                    `;

                    let value_social = [social.name, social.value, 1];

                    const res_social = await promise_query(text_social, value_social);
                    social = res_social.rows[0];
                }
                new_socials.push(social);
            }
        }

        user["contacts"] = new_contacts;
        user["socials"] = new_socials;

        res.status(200).send(user);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = infoRouter;