import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/Pagination';
import { TableStyle } from '../../components/Table';
import constants from '../../constants';
import { Button } from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';


const strftime = (date_string) => {
    const date = new Date(date_string);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
}

const WorkExperiencesScreenStyle = {
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

function WorkExperiencesScreen() {
    let history = useHistory();
    const [workExperiences, setWorkExperiences] = useState([]);

    const deleteWorkExperience =  async (id) => {
        fetch(`${constants.serverURL}/admin/work-experiences/${id}`, {
            method: "DELETE"
        }).then(_ => {
            const index = workExperiences.findIndex(item => item.id === id);
            workExperiences.splice(index, 1);
            setWorkExperiences([...workExperiences]);
        }).catch(error => {
            console.error(error);
        });
    }

    const getWorkExperiences = () => {
        fetch(`${constants.serverURL}/admin/work-experiences`)
        .then(response => response.json())
        .then(data => setWorkExperiences(data))
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getWorkExperiences();
    }, []);

    return (
        <WorkExperiencesScreenStyle.PageSection>
            <WorkExperiencesScreenStyle.H2>Work Experiences</WorkExperiencesScreenStyle.H2>
            <WorkExperiencesScreenStyle.ButtonSection>
                <Button primary onClick={_ => history.push("/admin/work-experiences/new")}>
                    Add
                </Button>
            </WorkExperiencesScreenStyle.ButtonSection>
            <TableStyle.Table>
                <thead>
                    <tr>
                        <TableStyle.Th width_25>Company Name</TableStyle.Th>
                        <TableStyle.Th width_15>Date Start</TableStyle.Th>
                        <TableStyle.Th width_15>Date End</TableStyle.Th>
                        <TableStyle.Th width_15>Position</TableStyle.Th>
                        <TableStyle.Th width_20>Location</TableStyle.Th>
                        <TableStyle.Th width_5></TableStyle.Th>
                        <TableStyle.Th width_5></TableStyle.Th>
                    </tr>
                </thead>
                <tbody>
                    {workExperiences.map(item => (
                        <tr key={item.id}>
                            <TableStyle.Td>{item.company}</TableStyle.Td>
                            <TableStyle.Td>{strftime(item.date_start)}</TableStyle.Td>
                            <TableStyle.Td>{strftime(item.date_end)}</TableStyle.Td>
                            <TableStyle.Td>{item.position}</TableStyle.Td>
                            <TableStyle.Td>{item.location}</TableStyle.Td>
                            <TableStyle.Td>
                                <TableStyle.Button onClick={_ => history.push(`/admin/work-experiences/${item.id}`)}>
                                    <div>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </div>
                                </TableStyle.Button>
                            </TableStyle.Td>
                            <TableStyle.Td>
                                <TableStyle.Button onClick={_ => deleteWorkExperience(item.id)}>
                                    <div>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </div>
                                </TableStyle.Button>
                            </TableStyle.Td>
                        </tr>
                    ))}
                </tbody>
            </TableStyle.Table>
            {/* <WorkExperiencesScreenStyle.PaginationSection>
                <Pagination/>
            </WorkExperiencesScreenStyle.PaginationSection> */}
        </WorkExperiencesScreenStyle.PageSection>
    );
}

export default WorkExperiencesScreen;
