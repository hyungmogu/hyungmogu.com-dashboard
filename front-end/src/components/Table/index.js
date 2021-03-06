import styled from 'styled-components';
import constants from '../../constants';

export const TableStyle = {
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
            } else if (props.width_20) {
                return "20  %";
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
