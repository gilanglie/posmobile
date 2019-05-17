import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const Login = ({ userDetails }) => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header pt-4">
      <PageTitle title="Guest Login" subtitle="Vardion Restaurant" md="12" className="ml-sm-auto mr-sm-auto" />

      <Col lg="12" className="mt-4 mx-auto mb-12">  
        {/* <UserDetails />  */}
        <img
          className="embed-responsive"
          src={userDetails.images}
          alt={userDetails.name}
        />
      </Col>
    </Row>
    <Row>
    <Card small className="mb-4">
      <ListGroup flush>
      <ListGroupItem className="p-3">
          <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="Sierra"
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="Brooks"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
            </Form>
        </ListGroupItem>
        </ListGroup>
      </Card>
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
    name: "Food Login",
    images: require("./../images/login-bg.jpg"),
  }
};
export default Login;
