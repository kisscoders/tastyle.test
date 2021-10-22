import styled from "styled-components";

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 72px;
  margin: 20px 0px;
  padding: 30px 0;
`;

export const H2 = styled.h1`
  font-weight: 700;
  font-size: 40px;
`;

export const BRAND = styled.h1`
  font-weight: 900;
  float: left;
  color: var(--red);
  /* text-align: center; */
  padding: 0 30px;
  text-decoration: none;
  font-size: 32px;
  position: absolute;
  &:hover {
    color: var(--red);
    /* background-color: var(--primary); */
    /* border-color: var(--primary); */
    /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25); */
  }
`;
export const Quote = styled.p`
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
  font-size: 20px;
  background-color: #fff;
  border-left: solid 5px var(--red);
`;

export const TAG = styled.p`
  padding: 10px 20px;
  display: inline;
  margin: auto;
  text-align: justify;
  font-size: 20px;
  background-color: #ffcdd2;
  /* border: solid 1px var(--red); */
  border-radius: 50px;
`;

export const TAG2 = styled.p`
  padding: 5px 20px;
  display: inline;
  margin: 20px 0 0 0;
  text-align: justify;
  font-size: 20px;
  background-color: var(--yellow);
  color: black;
  border-radius: 50px;
`;
