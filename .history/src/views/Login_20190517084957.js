import React from "react";
import { Container, Row, Col } from "shards-react";
import PropTypes from "prop-types";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

const Login = ({ userDetails }) => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Login" subtitle="Vardion Restaurant" md="12" className="ml-sm-auto mr-sm-auto" />

      <Col lg="12" className="mt-4">  
        {/* <UserDetails />  */}
        <img
          className=""
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </Col>
    </Row>
    <Row>
      
      <Col lg="12">
        <UserAccountDetails />
      </Col>
    </Row>
  </Container>
);
Login.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};
Login.defaultProps = {
  userDetails: {
    name: "Login Background",
    images: require("./../images/login-bg.jpg"),
    metaTitle: "Login Background",
  }
};
export default Login;
