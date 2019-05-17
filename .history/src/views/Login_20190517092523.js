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

      <Col lg="12" className="mt-4 mx-auto m-5">  
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
                <Col className="form-group">
                  <label htmlFor="feFirstName">Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="ex: John"
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col  className="form-group">
                  <label htmlFor="feLastName">Table No</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="ex: A10"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                <Col  className="form-group">
                  <label htmlFor="feFirstName">Total Guest</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="ex: 5"
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col className="form-group">
                  <Button theme="accent" className="h-auto w-100 mt-3" >Order Now</Button>
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
