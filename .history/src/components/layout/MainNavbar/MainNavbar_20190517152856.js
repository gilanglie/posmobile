import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar,Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import PageTitle from "../../common/PageTitle"; 

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top",
    "no-shadow"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 ">
          <NavbarToggle />
          <NavItem  >
            <PageTitle sm="4" title="Vardion" className="text-sm-left mt-3" />
          </NavItem>
          <nav className="nav">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#"  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
              <i className="material-icons">shopping_cart</i>
            </a>
          </nav>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
