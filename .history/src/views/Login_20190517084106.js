import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

const Login = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Login" subtitle="Vardion Restaurant" md="12" className="ml-sm-auto mr-sm-auto" />

      <Col lg="12" className="mt-4">  
        <UserDetails /> 
      </Col>
    </Row>
    <Row>
      
      <Col lg="12">
        <UserAccountDetails />
      </Col>
    </Row>
  </Container>
);

export default Login;
