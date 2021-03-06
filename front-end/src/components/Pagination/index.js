import styled from 'styled-components';
import constants from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

export default function Pagination() {
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
