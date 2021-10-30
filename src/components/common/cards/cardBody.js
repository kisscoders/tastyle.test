import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardBody1 = styled(Card.Body)`
  /* padding: 0.5em;
	margin: 0 0.5em 0 0;
	background-color: #fff;
	font-size: 2rem; */
  &.dashboard {
    min-height: 500px;
  }
`;
