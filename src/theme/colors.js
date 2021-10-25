import styled from "styled-components";

const ColorScheme = styled.div`
  --color: ${(props) => props.color};
  --primary: #007bff;
  --blue: #007bff;
  --red: #f54749;
  --yellow: #fec65e;
`;

export const RED = styled.span`
  color: #f54749;
  margin: none;
`;
export const GREEN = styled.span`
  margin: none;
  color: #4caf50;
`;
export const YELLOW = styled.span`
  margin: none;
  color: #fec65e;
`;

export default ColorScheme;
