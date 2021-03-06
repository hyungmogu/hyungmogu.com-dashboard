import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import constants from '../../constants';
import { TableStyle } from '../../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';


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

const sampleData = [
    {
        "id": 1,
        "title": "Chat Application",
        "date": "February 26th, 2021",
        "shortDescription": "A ReactJS and GraphQL based full-stack web chat application for the demonstrated learning in backend development",
        "techUsed": ["ReactJS", "Styled Components", "ES6 JavaScript", "Prisma ORM", "Node.js", "Apollo GraphQL"]
    },
];

function ProjectsScreen() {
    let history = useHistory();

    const deleteProject = () => {
        console.log("This is temporary");
    }

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
                        sampleData.map(item => (
                            <tr>
                                <TableStyle.Td>{item.title}</TableStyle.Td>
                                <TableStyle.Td>{item.date}</TableStyle.Td>
                                <TableStyle.Td>{item.shortDescription}</TableStyle.Td>
                                <TableStyle.Td>{item.techUsed.join(", ")}</TableStyle.Td>
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
            <ProjectsScreenStyle.PaginationSection>
                <Pagination/>
            </ProjectsScreenStyle.PaginationSection>
        </ProjectsScreenStyle.PageSection>
    );
}

export default ProjectsScreen;
