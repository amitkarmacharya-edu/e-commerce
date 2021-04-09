import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listProducts } from "../../store/actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.id

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error.message} />
      ) : (
        <Row>
          {
            products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product key={product._id} product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
