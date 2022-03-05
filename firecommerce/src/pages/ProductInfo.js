import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDb from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProductInfo() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDb, "products", params.productId)
      );

      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    //pahum enk local storage um vor refresh anelis chpoxi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img className="product-info-img" src={product.imageURL} />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
