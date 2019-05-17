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
      categ_id : false,
    }

  }
  componentDidMount () {
    const { category,categ_id } = this.props.location.state
    this.setState({
      categ_id,category
    })
    this.getProductCategory(categ_id);
  }

  getProductCategory(id){
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push([["pos_categ_id", "=", id]]);
        inParams.push(["display_name", "list_price" 
                      , "pos_categ_id",  
                      "description_sale", "description", "product_tmpl_id"]); //fields
        // inParams.push(0); //offset
        // inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        odoo.execute_kw("product.product", 'search_read', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('products: ', value);
            this.setState({
              products : value,
            })
        }.bind(this));
    }.bind(this));
  }

  render() {
    const {
      category,
      products,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4 bg-white">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title={category} subtitle="" className="text-sm-left text-left mb-2" />
        </Row>
        {/* Products */}
        <Row>
          {products.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1 no-shadow">
                <div 
                  className="card-post__image card-post__imgbg"
                  style={{ 
                    backgroundImage: `url(https://pos1.vardion.com/web/image?model=product.product&field=image&id=${post.id})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <Badge
                    className="card-post__category bg-success"
                    style={{fontSize: 12}}
                  >
                    IDR {post.list_price}
                  </Badge>
                </div>
              </Card>
              <h5 className="card-title mt-2">
                  <a href="#" className="text-dark">
                    {post.display_name}
                  </a>
                  <a href="#" className="text-dark float-right">
                    <i className="fas fa-fire text-danger mr-2"></i>
                    <i className="fas fa-star text-warning mr-2"></i>
                  </a>
              </h5>
            </Col>
            ))}
        </Row>

      </Container>
    );
  }
}

export default Products;
