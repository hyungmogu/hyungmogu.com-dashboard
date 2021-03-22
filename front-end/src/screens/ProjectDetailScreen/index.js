import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import { Button } from '../../components/Button';


const getYYYYMMDD = (date) => {
    date = new Date(date);
    const year = `${date.getFullYear()}`.padStart(4,"0");
    const month = `${date.getMonth()+1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const ProjectDetailScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${constants.sectionPadding};
    `,
    H2: styled.h2`
        color: ${constants.colorNavyBlue};
    `,
    ButtonSection: styled.section`
        display: flex;
        justify-content: flex-end;

        &:not(:last-child){
            margin: 0 0 1.41rem 0;
        }

        button:not(:last-child) {
            margin: 0 0.47rem 0 0;
        }
    `
};

function ProjectDetailScreen() {
    const location = useLocation();
    const history = useHistory();

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [demoURL, setDemoURL] = useState("");
    const [sourceURL, setSourceURL] = useState("");
    const [techsUsedList, _setTechsUsed] = useState([]);
    const [highlightsList, _setHighlights] = useState([]);
    const [imagesList, _setImages] = useState([]);

    const addTechUsed = (list) => {
        _setTechsUsed([...list, {"name": ""}]);
    }

    const setTechsUsed = (e, index, list) => {
        list[index].name = e.target.value;
        _setTechsUsed(list);
    }

    const deleteTechUsed = (index, list) => {
        if (!list[index].id) {
            list.splice(index, 1);
            _setTechsUsed([...list]);
            return;
        }

        const id = list[index].id;
        fetch(`${constants.serverURL}/admin/projects/techs-used/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setTechsUsed([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const addHighlight = (list) => {
        _setHighlights([...list, {"detail": ""}]);
    }

    const setHighlight = (e, index, list) => {
        list[index].detail = e.target.value;
        _setHighlights(list);
    }

    const deleteHighlight = (index, list) => {
        if (!list[index].id) {
            list.splice(index, 1);
            _setHighlights([...list]);
            return;
        }

        const id = list[index].id;
        fetch(`${constants.serverURL}/admin/projects/highlights/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setHighlights([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const addImage = (list) => {
        _setImages([...list, {"url": ""}]);
    }

    const setImage = (e, index, list) => {
        list[index].url = e.target.value;
        _setImages(list);
    }

    const deleteImage = (index, list) => {
        if (!list[index].id) {
            list.splice(index, 1);
            _setImages([...list]);
            return;
        }

        const id = list[index].id;
        fetch(`${constants.serverURL}/admin/projects/images/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setImages([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const addProject =  (history) => {
        const project = {
            title: title,
            date: date,
            header_image_url: headerImage,
            demo_url: demoURL,
            source_url: sourceURL,
            tech_used: techsUsedList,
            highlights: highlightsList,
            images: imagesList
        };

        fetch(`${constants.serverURL}/admin/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/projects/${data.id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const editProject = (history) => {
        const project = {
            id: id,
            title: title,
            date: date,
            header_image_url: headerImage,
            demo_url: demoURL,
            source_url: sourceURL,
            tech_used: techsUsedList,
            highlights: highlightsList,
            images: imagesList
        };

        fetch(`${constants.serverURL}/admin/projects/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/projects/${id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteProject = (history) => {
        fetch(`${constants.serverURL}/admin/projects/${id}`, {
            method: "DELETE"
        })
        .then(_ => {
            history.push(`/admin/projects`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getProject = (path) => {
        fetch(`${constants.serverURL}${path}`)
        .then(response => response.json())
        .then(data => {
            setId(data.id);
            setTitle(data.title);
            setDate(getYYYYMMDD(data.date));
            setHeaderImage(data.header_image_url);
            setDemoURL(data.demo_url);
            setSourceURL(data.source_url);
            _setHighlights(data.highlights);
            _setTechsUsed(data.tech_used);
            _setImages(data.images);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (location.pathname.includes("/new")) {
            addTechUsed(techsUsedList);
            addHighlight(highlightsList);
            addImage(imagesList);
        } else {
            getProject(location.pathname);
        }
    }, []);

    return (
        <ProjectDetailScreenStyle.Section>
            <ProjectDetailScreenStyle.H2>Portfolio Dashboard</ProjectDetailScreenStyle.H2>
            <ProjectDetailScreenStyle.ButtonSection>
                {
                    !location.pathname.includes("/new") ?
                        <Button secondary onClick={e => deleteProject(history)}>
                            Delete
                        </Button>
                    : null
                }
                <Button primary onClick={e => location.pathname.includes("/new") ? addProject(history) : editProject(history)}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Title</label>
                    <Form.Input
                        defaultValue={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date</label>
                    <Form.DateInput
                        defaultValue={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Header Image</label>
                    <Form.Input
                        defaultValue={headerImage}
                        onChange={e => setHeaderImage(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Demo URL</label>
                    <Form.Input
                        defaultValue={demoURL}
                        onChange={e => setDemoURL(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Source URL</label>
                    <Form.Input
                        defaultValue={sourceURL}
                        onChange={e => setSourceURL(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Techs Used</label>
                    <Form.InputList
                        list={techsUsedList}
                        objectKey="name"
                        onChange={(e, index) => setTechsUsed(e, index, techsUsedList)}
                        onAdd={_ => addTechUsed(techsUsedList)}
                        onDelete={(e, index) => deleteTechUsed(index, techsUsedList)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList
                        list={highlightsList}
                        objectKey="detail"
                        onChange={(e, index) => setHighlight(e, index, highlightsList)}
                        onAdd={_ => addHighlight(highlightsList)}
                        onDelete={(e, index) => deleteHighlight(index, highlightsList)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    <Form.InputList
                        list={imagesList}
                        objectKey="url"
                        onChange={(e, index) => setImage(e, index, imagesList)}
                        onAdd={_ => addImage(imagesList)}
                        onDelete={(e, index) => deleteImage(index, imagesList)}
                    />
                </Form.FormGroup>
            </form>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button primary onClick={e => location.pathname.includes("/new") ? addProject(history) : editProject(history)}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
        </ProjectDetailScreenStyle.Section>
    );
}

export default ProjectDetailScreen;

