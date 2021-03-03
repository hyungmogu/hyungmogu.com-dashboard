import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const containerPadding = "1.31rem";

const HomeScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${containerPadding};
        flex-grow: 1;

        display: flex;
        justify-content: center;
        align-items: center;
    `,
    Span: styled.span`
        font-size: 1.5rem;
        color: ${constants.colorNavyBlue};
    `
};

function HomeScreen() {
    return (
        <HomeScreenStyle.Section>
            <HomeScreenStyle.Span>Welcome to our Portfolio Site Dashboard</HomeScreenStyle.Span>
        </HomeScreenStyle.Section>
    );
}

export default HomeScreen;

