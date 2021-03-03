import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants';

const PrimaryNavMenuStyle = {
    Nav: styled.nav`
        max-width: 15rem;
        border-radius: 0.94rem;
        background-color: ${constants.colorNavyBlue};
        color: ${constants.colorWhite};
        margin: 2.39rem 1.17rem;

        h2 {
            padding: 2.30rem 2.0rem;
            margin: 0;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        li {
            padding: 1.03rem 2.0rem;
            Cursor: pointer;
            width: calc(15rem - 2.0rem * 2);
        }
    `,
    NavLinkNew : styled(NavLink)`
        text-decoration: none;
        color: ${constants.colorWhite};

        &.active {
            font-weight: bold;
        }
    `
};

function PrimaryNavMenu() {
    return (
        <PrimaryNavMenuStyle.Nav>
            <h2>Menu</h2>
            <ul>
                <li><PrimaryNavMenuStyle.NavLinkNew exact to="/admin">Home</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/info">Info</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/projects">Projects</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/work-experience">Work Experience</PrimaryNavMenuStyle.NavLinkNew></li>
            </ul>
        </PrimaryNavMenuStyle.Nav>
    );
};

const UserStyle = {
    Div: styled.div`
        border: 1px solid ${constants.colorPurple};
        padding: 0.8em;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1em;

        div {
            width: 1.25em;
            height: 1.25em;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        path {
            fill: ${constants.colorPurple};
        }
    `
};

function User() {
    return (
        <UserStyle.Div>
            <div>
                <FontAwesomeIcon icon={faUser}/>
            </div>
        </UserStyle.Div>
    );
};

const SecondaryNavMenuStyle = {
    Header: styled.nav`
       border-radius: ${constants.borderRadius};
       padding: 0.52rem;
       display: flex;
       justify-content: flex-end;
       align-items: center;
       margin: 0 0 2.06rem 0;
    `,
    Span: styled.span`
        margin-right: 0.75rem;

        strong {
            color: ${constants.colorPurple};
        }
    `
};

function SecondaryNavMenu() {
    return (
        <SecondaryNavMenuStyle.Header>
            <SecondaryNavMenuStyle.Span>Hello, <strong>Admin</strong></SecondaryNavMenuStyle.Span>
            <User/>
        </SecondaryNavMenuStyle.Header>
    );
};



export {
    PrimaryNavMenu,
    SecondaryNavMenu,
};