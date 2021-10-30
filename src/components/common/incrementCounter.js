import React, { useState } from "react";
import styled from "styled-components";

const IncContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* margin: 0; */
`;
const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  margin: 0;
  padding: 0;
  text-align: center;
  border-top: 2px solid #dee0ee;
  border-bottom: 2px solid #dee0ee;
  border-left: 2px solid #dee0ee;
  border-right: 2px solid #dee0ee;
  background: #fff;
  color: #8184a1;
  transition: all 0.3s ease-in-out 0s;
  &:hover {
    border-color: #575b71;
  }
`;

const Sign = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: auto auto;
  align-items: center;
  background: #dee0ee;
  text-decoration: none;
  text-align: center;
  border: none;
  transition: all 0.3s ease-in-out 0s;
  &.signplus {
    border-radius: 0 5px 5px 0;
  }
  &.signminus {
    border-radius: 5px 0 0 5px;
  }
  &:hover {
    background: #575b71;
    color: #fff;
  }
`;

const IncrementCount = () => {
  const [quantity, setQuantity] = useState(2);

  const handleQuantity = (operation, value) => {};
  const PriceCalc = (quantity, price) => {
    const priceSum = quantity * price;
    return (
      <div>
        <h3>Total Amount</h3>
        <h3>{priceSum}</h3>
      </div>
    );
  };
  //   const handleQChange = ({ currentTarget: input }) => {};

  const incFunc = (operation, value) => {
    if (operation === "add") {
      const newvalue = value++;
      //   setQuantity(newvalue);
      return;
    } else if (operation === "sub") {
      const newvalue = value--;
      //   setQuantity(newvalue);
      return;
    }
  };
  return (
    <div>
      <IncContain>
        <Sign className="signminus" onClick={incFunc("sub", quantity)}>
          {/* <span className="m-0 p-0">-</span> */}-
        </Sign>
        <QuantityInput
          name="quantity"
          type="text"
          value={quantity}
          //   onChange={handleQChange}
        />
        <Sign className="signplus">{/* <span>+</span> */}+</Sign>
      </IncContain>
      {PriceCalc(quantity, 89)}
    </div>
  );
};

export default IncrementCount;
