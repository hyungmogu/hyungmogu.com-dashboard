import styled from 'styled-components';
import constants from '../../constants';

const ButtonStyle = {
    Button: styled.button`
        border: transparent;
        border-radius: ${constants.borderRadius};
        background-color: ${props => {
            if (props.primary) {
                return constants.colorNavyBlue;
            } else if (props.secondary) {
                return constants.colorOrange;
            }
        }};
        color: ${constants.colorWhite};
        padding: 0.56rem;
        cursor: pointer;

    `,
    Div: styled.div`
        min-width: 6.09rem;
    `
}

export default function Button(props) {
    return(
        <ButtonStyle.Button {...props}>
            <ButtonStyle.Div>
                {props.children}
            </ButtonStyle.Div>
        </ButtonStyle.Button>
    );
}

export {
    Button
};