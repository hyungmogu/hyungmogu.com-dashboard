import styled from 'styled-components';
import constants from '../../constants';

const InputStyle = {
    Div: styled.div`
        display: flex;
    `,
    Input: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};

function Input() {
    return(
        <InputStyle.Div>
            <InputStyle.Input/>
        </InputStyle.Div>
    )
};


const FormGroup = styled.div`
    margin: 0 0 0.6rem 0;

    & > label {
        margin: 0 0 0.6rem 0;
    }

    & > * {
        display: block;
    }

    & > div {
        display: flex;
    }
`;

const KeyValueInputStyle = {
    Div: styled.div`
        margin: 0 0 0.23rem 0;
    `,
    InputKey: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;

        max-width: 10.31rem;
        margin: 0 0.23rem 0 0;
        flex-grow: initial;
    `,
    InputValue: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};

function KeyValueInput() {
    return(
        <KeyValueInputStyle.Div>
            <KeyValueInputStyle.InputKey/><KeyValueInputStyle.InputValue/>
        </KeyValueInputStyle.Div>
    )
};

const AddMoreButtonStyle = {
    Button: styled.button`
        color: ${constants.colorWhite};
        border: none;
        background-color: ${constants.colorPurple};
        border-radius: 0.14rem;
        padding: 0.16rem;
        cursor: pointer;
    `,
    Div: styled.div`
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    Section: styled.section`
        display: flex;
        justify-content: center;
    `
};

function AddMoreButton(props) {
    return(
        <AddMoreButtonStyle.Section>
            <AddMoreButtonStyle.Button onClick={props.onClick}>
                <AddMoreButtonStyle.Div>
                <strong>+</strong>
                </AddMoreButtonStyle.Div>
            </AddMoreButtonStyle.Button>
        </AddMoreButtonStyle.Section>
    );
}

export default {
    Input,
    FormGroup,
    KeyValueInput,
    AddMoreButton,
};