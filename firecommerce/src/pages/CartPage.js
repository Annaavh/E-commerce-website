import React, { useEffect, useState } from "react";
import { FaProductHunt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";

function CartPage() {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp += item.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    //pahum enk local storage um vor refresh anelis chpoxi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo, "address");

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUserCommerce")).user.email,
      userId: JSON.parse(localStorage.getItem("currentUserCommerce")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      console.log(result, "orders from cart");
      setLoading(false);
      alert("success");
      handleClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("failed");
    }
  };

  return (
    <Layout>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    cursor={"pointer"}
                    onClick={() => deleteFromCart(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {totalAmount}</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Address"
            />
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Pincode"
            />
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Phone number"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
