import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from '../../components/FormContainer'
import { USER_EDIT_RESET } from '../../store/constants/userContants'
import { listProductDetails, updateProduct } from "../../store/actions/productActions";

const UserEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails

  useEffect(() => {

      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(name)
        setPrice(price)
        setImage(image)
        setBrand(brand)
        setCategory(category)
        setCountInStock(countInStock)
        setDescription(description)
      }

  }, [dispatch, history, productId, product]);

  const submitHandler = (e) => {
    e.preventDefault()
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn-light-my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image url"
                checked={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                checked={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
              </Form.Group>
            <Form.Group controlId="category">
              <Form.Control
                label="Category"
                type="text"
                placeholder="Enter Category Name"
                checked={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
              </Form.Group>
            <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
              <Form.Control
                type="areatext"
                placeholder="Enter Description Name"
                checked={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
