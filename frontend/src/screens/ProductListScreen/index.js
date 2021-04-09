import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listProducts,
  deleteProduct as deleteProductWithId,
  createProduct as createNewProduct,
} from "../../store/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../store/constants/productConstants";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const createProduct = useSelector((state) => state.createProduct);
  const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = createProduct;

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteProduct;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET})

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } 

    if(successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }

  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const createProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(createNewProduct())
    }
  };
  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProductWithId(productId));
    }
  };

  return (
    <>
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      { loadingDelete && <Loader /> }
      { errorDelete && <Message variant='danger'>{errorDelete}</Message> }
      { loadingCreate && <Loader /> }
      { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
