DROP TABLE IF EXISTS user_self;
CREATE TABLE user_self (
    id           SERIAL PRIMARY KEY,
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    nick_name    VARCHAR(255)
);

DROP TABLE IF EXISTS work_experiences;
CREATE TABLE work_experiences (
    id           SERIAL PRIMARY KEY,
    company      VARCHAR(100),
    date_start   DATE,
    date_end     DATE,
    location     VARCHAR(255),
    user_id      INT,
    FOREIGN KEY (user_id) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    user_id     INT,
    FOREIGN KEY (user_id) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS socials;
CREATE TABLE socials (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    user_id     INT,
    FOREIGN KEY (user_id) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id                  SERIAL PRIMARY KEY,
    title               VARCHAR(100),
    date                DATE,
    short_description   VARCHAR(255),
    demo_url            VARCHAR(255),
    source_url          VARCHAR(255),
    user_id              INT,
    FOREIGN KEY (user_id) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS highlights;
CREATE TABLE highlights (
    id              SERIAL PRIMARY KEY,
    detail          VARCHAR(255),
    work_exp_id     INT,
    FOREIGN KEY (work_exp_id) REFERENCES work_experiences(id) ON DELETE CASCADE,
    project_id      INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tech_used;
CREATE TABLE tech_used (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100),
    work_exp_id     INT,
    FOREIGN KEY (work_exp_id) REFERENCES work_experiences(id) ON DELETE CASCADE,
    project_id      INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS images;
CREATE TABLE images (
    id          SERIAL PRIMARY KEY,
    url         VARCHAR(255),
    project_id   INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);


INSERT INTO user_self(first_name, last_name, nick_name) VALUES ('Hyungmo', 'Gu', 'Moe');