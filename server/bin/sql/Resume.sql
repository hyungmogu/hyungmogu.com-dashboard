DROP TABLE IF EXISTS user_self;
CREATE TABLE user_self (
    id          SERIAL PRIMARY KEY,
    firstName   VARCHAR(255),
    lastName    VARCHAR(255),
    nickName    VARCHAR(255)
);

DROP TABLE IF EXISTS work_experiences;
CREATE TABLE work_experiences (
    id          SERIAL PRIMARY KEY,
    company     VARCHAR(100),
    dateStart   DATE,
    dateEnd     DATE,
    location    VARCHAR(255),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS socials;
CREATE TABLE socials (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id                  SERIAL PRIMARY KEY,
    title               VARCHAR(100),
    date                DATE,
    shortDescription    VARCHAR(255),
    demoURL             VARCHAR(255),
    sourceURL           VARCHAR(255),
    userId              INT,
    FOREIGN KEY (userId) REFERENCES user_self(id)
);

DROP TABLE IF EXISTS highlights;
CREATE TABLE highlights (
    id          SERIAL PRIMARY KEY,
    detail      VARCHAR(255),
    workExpId   INT,
    FOREIGN KEY (workExpId) REFERENCES work_experiences(id),
    projectId   INT,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);

DROP TABLE IF EXISTS tech_used;
CREATE TABLE tech_used (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    workExpId   INT,
    FOREIGN KEY (workExpId) REFERENCES work_experiences(id),
    projectId   INT,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);

DROP TABLE IF EXISTS images;
CREATE TABLE images (
    id          SERIAL PRIMARY KEY,
    url         VARCHAR(100),
    projectId   INT,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);


INSERT INTO user_self(firstName, lastName, nickName) VALUES ('Hyungmo', 'Gu', 'Moe');