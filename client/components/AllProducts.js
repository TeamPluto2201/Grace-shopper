import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// designName:
// price:
// img:

const dummyData = [
  {
    id: 1,
    designName: "A Cool T-shirt",
    price: 20,
    img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
  },
  {
    id: 2,
    designName: "A Pretty Cool T-shirt",
    price: 80,
    img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
  },
  {
    id: 3,
    designName: "A Not Very Cool T-shirt",
    price: 60,
    img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
  },
  {
    id: 4,
    designName: "A Kind Of Cool T-shirt",
    price: 210,
    img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
  },
  {
    id: 5,
    designName: "A Super Cool T-shirt",
    price: 220,
    img: "https://smwv.org/wp-content/uploads/2021/01/tshirt-2.jpg",
  },
];

export const AllProducts = () => {
  return (
    <div>
      <h1>Welcome to The All Products Page</h1>
      <div>
        {dummyData.map((tShirt) => {
          return (
            <div key={tShirt.id}>
              <img src={tShirt.img} />
              <div>{tShirt.designName}</div>
              <div>${tShirt.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
