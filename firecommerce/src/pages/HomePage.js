import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDb from "../fireConfig";
import { fireproducts } from "../fireproducts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems, "from home");
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDb, "products"));
      const productsArr = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArr.push(obj);
        setLoading(false);
      });

      setProducts(productsArr);
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
        <div className="d-flex w-50 align-items-center my-3">
          <input
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
            type="text"
            className="form-control"
            placeholder="Search Items"
          />
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
            className="form-control mt-3"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobile">Mobile</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((item) => item.name.toLowerCase().includes(searchKey))
            .filter((item) => item.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img className="product-img" src={product.imageURL} />
                      </div>
                    </div>

                    <div className="product-actions">
                      <h3>{product.price}</h3>
                      <div className="d-flex">
                        <button
                          className="ms-2"
                          onClick={() => addToCart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
