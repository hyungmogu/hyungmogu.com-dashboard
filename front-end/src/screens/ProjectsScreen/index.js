import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/Pagination';
import constants from '../../constants';
import { Button } from '../../components/Button';
import { TableStyle } from '../../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const strftime = (date_string) => {
    const date = new Date(date_string);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleString('en-US', options);
}

const ProjectsScreenStyle = {
    PageSection: styled.section`
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
    `,
    PaginationSection: styled.section`
        display: flex;
        justify-content: flex-end;
    `
};

function ProjectsScreen() {
    let history = useHistory();
    const [projects, setProjects] = useState([]);

    const deleteProject =  async (id) => {
        fetch(`${constants.serverURL}/admin/projects/${id}`, {
            method: "DELETE"
        }).then(_ => {
            const index = projects.findIndex(item => item.id === id);
            projects.splice(index, 1);
            setProjects([...projects]);
        }).catch(error => {
            console.error(error);
        });
    }

    const getProjects = () => {
        fetch(`${constants.serverURL}/admin/projects`)
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectsScreenStyle.PageSection>
            <ProjectsScreenStyle.H2>Projects</ProjectsScreenStyle.H2>
            <ProjectsScreenStyle.ButtonSection>
                <Button primary onClick={_ => history.push("/admin/projects/new")}>
                    Add
                </Button>
            </ProjectsScreenStyle.ButtonSection>
            <TableStyle.Table>
                <thead>
                    <tr>
                        <TableStyle.Th width_25>Name</TableStyle.Th>
                        <TableStyle.Th width_15>Date</TableStyle.Th>
                        <TableStyle.Th width_25>Short Description</TableStyle.Th>
                        <TableStyle.Th width_25>Tools Used</TableStyle.Th>
                        <TableStyle.Th width_5></TableStyle.Th>
                        <TableStyle.Th width_5></TableStyle.Th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(item => (
                            <tr>
                                <TableStyle.Td>{item.title}</TableStyle.Td>
                                <TableStyle.Td>{strftime(item.date)}</TableStyle.Td>
                                <TableStyle.Td>{item.short_description}</TableStyle.Td>
                                <TableStyle.Td>{item.tech_used.map(item => item.name).join(", ")}</TableStyle.Td>
                                <TableStyle.Td>
                                    <TableStyle.Button onClick={_ => history.push(`/admin/projects/${item.id}`)}>
                                        <div>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </div>
                                    </TableStyle.Button>
                                </TableStyle.Td>
                                <TableStyle.Td>
                                    <TableStyle.Button onClick={_ => deleteProject(item.id)}>
                                        <div>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </div>
                                    </TableStyle.Button>
                                </TableStyle.Td>
                            </tr>
                        ))
                    }
                </tbody>
            </TableStyle.Table>
            {/* <ProjectsScreenStyle.PaginationSection>
                <Pagination/>
            </ProjectsScreenStyle.PaginationSection> */}
        </ProjectsScreenStyle.PageSection>
    );
}

export default ProjectsScreen;
