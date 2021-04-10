import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import ProductCarousel from "../../components/ProductCarousel";
import { listProducts } from "../../store/actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error.message} />
      ) : (
        <>
        <Row>
          {
            products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product key={product._id} product={product} />
              </Col>
            ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
