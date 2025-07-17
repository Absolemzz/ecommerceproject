import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const apiData = await response.json();

      // Custom hoodie product (OUT OF STOCK)
      const hoodieProduct = {
        id: 9999,
        title: "Nike Women's Sportswear",
        price: 120,
        description:
          "50%+ sustainable, incl. recycled polyester & organic cotton (≥10% each)",
        category: "women's clothing",
        image:
          "https://midwaysports.com/cdn/shop/files/NikeWomen_sTeamTechFleeceWindrunnerHoodieFZ_3_ff4651d4-e93d-41ba-95a5-f0df0631b6c3.png?v=1750231189",
        rating: { rate: 4.5, count: 87 },
        outOfStock: true,
      };

      const extendedData = [...apiData, hoodieProduct];
      setData(extendedData);
      setFilter(extendedData);
      setLoading(false);
    };

    getProducts();
  }, []);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
          All
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>
          Men's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
          Women's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>
          Jewelery
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>
          Electronics
        </button>
      </div>

      {filter.map((product) => (
        <div
          id={product.id}
          key={product.id}
          className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        >
          <div className="card text-center h-100">
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">
                {product.title.length > 12
                  ? product.title.substring(0, 12) + "..."
                  : product.title}
              </h5>
              <p className="card-text">
                {product.description.length > 90
                  ? product.description.substring(0, 90) + "..."
                  : product.description}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {product.price}</li>
            </ul>
            <div className="card-body">
              {product.outOfStock ? (
                <div className="d-flex justify-content-center">
                  <button className="btn btn-danger" disabled>
                    Out of Stock
                  </button>
                </div>
              ) : (
                <>
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;



