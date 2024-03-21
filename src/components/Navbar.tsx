import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <Nav>
            <Logo href="/">Levels_kz</Logo>
            <NavMenu>
                <NavItem href="/home">Companies</NavItem>
                <NavItem href="/edit">Edit</NavItem>
                <NavItem href="/">SignIn</NavItem>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-decoration: none;

    &:hover {
        color: #ddd;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

const NavItem = styled.a`
    margin-left: 20px;
    color: white;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        color: #ddd;
    }
`;
