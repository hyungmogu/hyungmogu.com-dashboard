import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import { TableStyle } from '../../components/Table';
import constants from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

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

const sampleData = [
    {
        "id": 1,
        "company": "SiteMax Systems Inc.",
        "location": "Vancouver, BC, Canada",
        "position": "Junior Developer",
        "dateStart": "January 2018",
        "dateEnd": "December 2019"
    }
];

function WorkExperiencesScreen() {
    const history = useHistory();
    const deleteWorkExperience = () => {
        console.log("This is temporary");
    }

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
                    {sampleData.map(item => (
                        <tr>
                            <TableStyle.Td>{item.company}</TableStyle.Td>
                            <TableStyle.Td>{item.dateStart}</TableStyle.Td>
                            <TableStyle.Td>{item.dateEnd}</TableStyle.Td>
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
            <WorkExperiencesScreenStyle.PaginationSection>
                <Pagination/>
            </WorkExperiencesScreenStyle.PaginationSection>
        </WorkExperiencesScreenStyle.PageSection>
    );
}

export default WorkExperiencesScreen;
