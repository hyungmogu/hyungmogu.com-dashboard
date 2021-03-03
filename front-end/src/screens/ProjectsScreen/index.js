import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import constants from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const sectionPadding = "1.31rem";

const ProjectsScreenStyle = {
    PageSection: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${sectionPadding};
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

const TableStyle = {
    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    `,
    Th: styled.th`
        background-color: ${constants.colorLightGrey};
        font-weight: normal;
        text-align: left;
        padding: 0.75rem;
        width: ${props => {
            if (props.width_25) {
                return "25%";
            } else if (props.width_15) {
                return "15%";
            } else if (props.width_5) {
                return "5%";
            }
        }}
    `,
    Td: styled.td`
        padding: 0.75rem;
    `,
    Button: styled.button`
        background-color: transparent;
        border: none;
        padding: 0.16rem;
        cursor: pointer;

        div {
            width: 1.1rem;
            height: 1.1rem;
        }
    `
}

const PaginationStyle = {
    Button: styled.button`
        border: ${constants.colorGrey};
        padding: 0.28rem;
        background-color: ${props => {
            if (props.bg_grey) {
                return constants.colorGrey;
            } else {
                return constants.colorWhite;
            }
        }};
        cursor: pointer;
    `
};

function Pagination() {
    return(
        <div>
            <PaginationStyle.Button bg_grey>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </PaginationStyle.Button>
            <PaginationStyle.Button>1</PaginationStyle.Button>
            <PaginationStyle.Button>2</PaginationStyle.Button>
            <PaginationStyle.Button>3</PaginationStyle.Button>
            <PaginationStyle.Button bg_grey>
                <FontAwesomeIcon icon={faChevronRight}/>
            </PaginationStyle.Button>
        </div>
    );
}

function ProjectsScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

    return (
        <ProjectsScreenStyle.PageSection>
            <ProjectsScreenStyle.H2>Projects</ProjectsScreenStyle.H2>
            <ProjectsScreenStyle.ButtonSection>
                <Button primary>
                    Add
                </Button>
            </ProjectsScreenStyle.ButtonSection>
            <TableStyle.Table>
                <tr>
                    <TableStyle.Th width_25>Name</TableStyle.Th>
                    <TableStyle.Th width_15>Date</TableStyle.Th>
                    <TableStyle.Th width_25>Short Description</TableStyle.Th>
                    <TableStyle.Th width_25>Tools Used</TableStyle.Th>
                    <TableStyle.Th width_5></TableStyle.Th>
                    <TableStyle.Th width_5></TableStyle.Th>
                </tr>
                <tr>
                    <TableStyle.Td>Portfolio Dashboard</TableStyle.Td>
                    <TableStyle.Td>March 1st, 2021</TableStyle.Td>
                    <TableStyle.Td>Dashboard housing information for hyungmogu.com</TableStyle.Td>
                    <TableStyle.Td>Node.js, PostgreSQL, ReactJS</TableStyle.Td>
                    <TableStyle.Td>
                        <TableStyle.Button>
                            <div>
                                <FontAwesomeIcon icon={faEdit}/>
                            </div>
                        </TableStyle.Button>
                    </TableStyle.Td>
                    <TableStyle.Td>
                        <TableStyle.Button>
                            <div>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </div>
                        </TableStyle.Button>
                    </TableStyle.Td>
                </tr>
            </TableStyle.Table>
            <ProjectsScreenStyle.PaginationSection>
                <Pagination/>
            </ProjectsScreenStyle.PaginationSection>
        </ProjectsScreenStyle.PageSection>
    );
}

export default ProjectsScreen;
