import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Media,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
} from 'reactstrap';
import { Paper } from "@material-ui/core";
import imgLogo from '../../pokeball.png'

const Header = (props) => {

    const NavbarStyle = {
        marginLeft: '20px',
    }

    return (
        <div>
            <Paper elevation={10}>
                <Navbar style={NavbarStyle} light expand="md">
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col>
                            <Media style={{ width: '50px', height: '50px' }} object src={imgLogo} ></Media>
                            <NavbarBrand style={{ marginLeft: '10px' }} href="/">PokeDex</NavbarBrand>
                        </Col>
                    </Row>
                </Navbar>

            </Paper>
        </div>
    );
}

export default Header;