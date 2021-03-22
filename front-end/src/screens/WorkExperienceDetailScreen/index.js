import React, { useState, useEffect } from 'react';
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

const WorkExperienceDetailScreenStyle = {
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

function WorkExperienceDetailScreen() {
    const location = useLocation();
    const history = useHistory();

    const [id, setId] = useState(0);
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [companyLocation, setCompanyLocation] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [techsUsedList, _setTechsUsed] = useState([]);
    const [highlightsList, _setHighlights] = useState([]);

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
        fetch(`${constants.serverURL}/admin/work-experiences/techs-used/${id}`, {
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
        fetch(`${constants.serverURL}/admin/work-experiences/highlights/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setHighlights([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const addWorkExperience =  (history) => {
        const workExp = {
            company: company,
            position: position,
            location: companyLocation,
            date_start: dateStart,
            date_end: dateEnd,
            tech_used: techsUsedList,
            highlights: highlightsList,
        };

        fetch(`${constants.serverURL}/admin/work-experiences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workExp)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/work-experiences/${data.id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const editWorkExperience = (history) => {
        const workExp = {
            id: id,
            company: company,
            position: position,
            location: companyLocation,
            date_start: dateStart,
            date_end: dateEnd,
            tech_used: techsUsedList,
            highlights: highlightsList,
        };

        fetch(`${constants.serverURL}/admin/work-experiences/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workExp)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/work-experiences/${id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteWorkExperience = (history) => {
        fetch(`${constants.serverURL}/admin/work-experiences/${id}`, {
            method: "DELETE"
        })
        .then(_ => {
            history.push(`/admin/work-experiences`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getWorkExperience = (path) => {
        fetch(`${constants.serverURL}${path}`)
        .then(response => response.json())
        .then(data => {
            setId(data.id);
            setCompany(data.company);
            setPosition(data.position);
            setCompanyLocation(data.location);
            setDateStart(getYYYYMMDD(data.date_start));
            setDateEnd(getYYYYMMDD(data.date_end));
            _setHighlights(data.highlights);
            _setTechsUsed(data.tech_used);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (location.pathname.includes("/new")) {
            addTechUsed(techsUsedList);
            addHighlight(highlightsList);
        } else {
            getWorkExperience(location.pathname);
        }
    }, []);


    return (
        <WorkExperienceDetailScreenStyle.Section>
            <WorkExperienceDetailScreenStyle.H2>{id ? `${company} - ${position}` : "New Work Experience"}</WorkExperienceDetailScreenStyle.H2>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                {
                    !location.pathname.includes("/new") ?
                        <Button secondary onClick={e => deleteWorkExperience(e, history)}>
                            Delete
                        </Button>
                    : null
                }
                <Button primary onClick={e => location.pathname.includes("/new") ? addWorkExperience(history) : editWorkExperience(history)}>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Company Name</label>
                    <Form.Input
                        defaultValue={company}
                        onChange={e => setCompany(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Position</label>
                    <Form.Input
                        defaultValue={position}
                        onChange={e => setPosition(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date Start</label>
                    <Form.DateInput
                        defaultValue={dateStart}
                        onChange={e => setDateStart(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date End</label>
                    <Form.DateInput
                        defaultValue={dateEnd}
                        onChange={e => setDateEnd(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Location</label>
                    <Form.Input
                        defaultValue={companyLocation}
                        onChange={e => setCompanyLocation(e.target.value)}
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
            </form>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                <Button primary onClick={e => location.pathname.includes("/new") ? addWorkExperience(history) : editWorkExperience(history)}>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
        </WorkExperienceDetailScreenStyle.Section>
    );
}

export default WorkExperienceDetailScreen;

