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
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommend : [],
      products : [],
      category : [],
      // First list of posts.
      PostsListOne: [
        {
          backgroundImage: require("../images/content-management/1.jpeg"),
          category: "Business",
          categoryTheme: "dark",
          author: "Anna Kunis",
          authorAvatar: require("../images/avatars/1.jpg"),
          title: "Conduct at an replied removal an amongst",
          body:
            "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
          date: "28 February 2019"
        }
      ],

      // Second list of posts.
      PostsListTwo: [
        {
          backgroundImage: require("../images/content-management/5.jpeg"),
          category: "Travel",
          categoryTheme: "info",
          author: "Anna Ken",
          authorAvatar: require("../images/avatars/0.jpg"),
          title:
            "Attention he extremity unwilling on otherwise cars backwards yet",
          body:
            "Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor jet pan flying over...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/6.jpeg"),
          category: "Business",
          categoryTheme: "dark",
          author: "John James",
          authorAvatar: require("../images/avatars/1.jpg"),
          title:
            "Totally words widow one downs few age every seven if miss part by fact",
          body:
            "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...",
          date: "29 February 2019"
        }
      ],

      // Third list of posts.
      PostsListThree: [
        {
          author: "John James",
          authorAvatar: require("../images/avatars/1.jpg"),
          title: "Had denoting properly jointure which well books beyond",
          body:
            "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
          date: "29 February 2019"
        },
        {
          author: "John James",
          authorAvatar: require("../images/avatars/2.jpg"),
          title: "Husbands ask repeated resolved but laughter debating",
          body:
            "It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears...",
          date: "29 February 2019"
        },
        {
          author: "John James",
          authorAvatar: require("../images/avatars/3.jpg"),
          title:
            "Instantly gentleman contained belonging exquisite now direction",
          body:
            "West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest merit checking railway...",
          date: "29 February 2019"
        }
      ],

      // Fourth list of posts.
      PostsListFour: [
        {
          backgroundImage: require("../images/content-management/7.jpeg"),
          author: "Alene Trenton",
          authorUrl: "#",
          category: "News",
          categoryUrl: "#",
          title: "Extremity so attending objection as engrossed",
          body:
            "Pursuit chamber as elderly amongst on. Distant however warrant farther to of. My justice wishing prudent waiting in be...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/8.jpeg"),
          author: "Chris Jamie",
          authorUrl: "#",
          category: "News",
          categoryUrl: "#",
          title: "Bed sincerity yet therefore forfeited his",
          body:
            "Speaking throwing breeding betrayed children my to. Me marianne no he horrible produced ye. Sufficient unpleasing and...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/9.jpeg"),
          author: "Monica Jordan",
          authorUrl: "#",
          category: "News",
          categoryUrl: "#",
          title: "Object remark lively all did feebly excuse our",
          body:
            "Morning prudent removal an letters by. On could my in order never it. Or excited certain sixteen it to parties colonel not seeing...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/10.jpeg"),
          author: "Monica Jordan",
          authorUrl: "#",
          category: "News",
          categoryUrl: "#",
          title: "His followed carriage proposal entrance",
          body:
            "For county now sister engage had season better had waited. Occasional mrs interested far expression directly as regard...",
          date: "29 February 2019"
        }
      ]
    };
    this.getCategory();
    this.getProduct();
  }
  getCategory(){
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        // console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([]);
        inParams.push(["id", "name", "parent_id", "child_id", "image"]); //fields
        // inParams.push(0); //offset
        // inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        odoo.execute_kw("pos.category", 'search_read', params, function (err, value) {
            if (err) { return console.log(err); }
            // console.log('Result: ', value);
            this.setState({
              category : value
            })
        }.bind(this));
    }.bind(this));
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
            console.log('Result: ', value);
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
      PostsListTwo,
      PostsListThree,
      PostsListFour
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
              <Card small className="card-post card-post--1 no-shadow">
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
                    {recommend.pos_categ_id[1]}
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
          {PostsListTwo.map((post, idx) => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.author}
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Second Row of Posts */}
        <Row>
          {PostsListTwo.map((post, idx) => (
            <Col lg="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--aside card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by Anna Ken
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Third Row of Posts */}
        <Row>
          {PostsListThree.map((post, idx) => (
            <Col lg="4" key={idx}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.body}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by James Khan
                    </a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.author}
                      </span>
                      <small className="text-muted">{post.date}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Button size="sm" theme="white">
                      <i className="far fa-bookmark mr-1" /> Bookmark
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Fourth Row of posts */}
        <Row>
          {PostsListFour.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post h-100">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                />
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text">{post.body}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <span className="d-inline-block">
                    By
                    <a className="text-fiord-blue" href={post.authorUrl}>
                      {post.author}
                    </a>{" "}
                    in
                    <a className="text-fiord-blue" href={post.categoryUrl}>
                      {post.category}
                    </a>
                  </span>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Home;
