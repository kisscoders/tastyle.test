import styled from "styled-components";
import { Card } from "react-bootstrap";

export const Card1 = styled(Card)`
  padding: 0.5em;
  margin: 0.5em;
  ${"" /* color: ${(props) => props.inputColor || "palevioletred"}; */}
  /* background-color: #FFF8F8; */
  border: none;
  border-radius: 0.625rem;
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
`;
// FFF4F3;
