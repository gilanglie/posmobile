/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Odoo from "../services/Api"
var odoo = new Odoo({
  url: 'https://pos1.vardion.com',
  port: 443,
  db: 'pos1',
  username: 'admin',
  password: 'pass4pos1'
});

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products : [],
      category : false,
    }

    this.getProduct();
  }

  getProduct(){
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        // console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([["sale_ok", "=", true], ["available_in_pos", "=", true]]);
        inParams.push(["display_name", "list_price" 
                      , "pos_categ_id",  
                      "description_sale", "description", "product_tmpl_id"]); //fields
        // inParams.push(0); //offset
        // inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        odoo.execute_kw("product.product", 'search_read', params, function (err, value) {
            if (err) { return console.log(err); }
            // console.log('Result: ', value);
            this.setState({
              products : value,
              recommend : value[0],
            })
        }.bind(this));
    }.bind(this));
  }

  render() {
    const {
      recommend,
      category,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4 bg-white">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Today" subtitle="" className="text-sm-left text-left mb-2" />
          <PageTitle sm="4" title="Recommendation" subtitle="" className="text-sm-left text-left" />
          
        </Row>
        {/* Recommendation */}
        <Row>
            <Col lg="3" md="6" sm="12" className="mb-4" >
              <Card small className="card-post card-post--1 no-shadow" >
                <div 
                  className="card-post__image card-post__imgbg"
                  style={{ 
                    backgroundImage: `url(https://pos1.vardion.com/web/image?model=product.product&field=image&id=${recommend.id})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-primary`}
                  >
                    {recommend.pos_categ_id}
                  </Badge>
                </div>
              </Card>
              <h5 className="card-title mt-2">
                  <a href="#" className="text-dark">
                    {recommend.display_name}
                  </a>
                  <a href="#" className="text-dark float-right">
                    <i className="fas fa-fire text-danger mr-2"></i>
                    <i className="fas fa-star text-warning mr-2"></i>
                  </a>
              </h5>
            </Col>
        </Row>

        {/* Category */}
        <Row>
          <PageTitle sm="4" title="Categories" subtitle="" className="text-sm-left text-left text-dark" />
          {category.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1 no-shadow" 
                  onClick={() => {
                      
                  }}
            >
              <div 
                className="card-post__image card-post__imgbg"
                style={{ 
                  backgroundImage: `url(https://pos1.vardion.com/web/image?model=pos.category&field=image&id=${post.id})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
               <h2 className="card-title my-5 text-white text-center">
                  {post.name}
               </h2>
              </div>
            </Card>
          </Col>
          ))}
        </Row>

      </Container>
    );
  }
}

export default Products;
