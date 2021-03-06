import React, { useState } from 'react';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';


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
    let [highlightsList, setHighlightsList] = useState([""]);

    return (
        <WorkExperienceDetailScreenStyle.Section>
            <WorkExperienceDetailScreenStyle.H2>SiteMax Systems Inc. - Junior Developer</WorkExperienceDetailScreenStyle.H2>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                <Button secondary>
                    Delete
                </Button>
                <Button primary>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Company Name</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Position</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Location</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date Start</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date End</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Tech Stacks</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} onAdd={_ => setHighlightsList(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
            </form>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                <Button primary>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
        </WorkExperienceDetailScreenStyle.Section>
    );
}

export default WorkExperienceDetailScreen;

