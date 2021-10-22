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
`;
export const GREEN = styled.span`
  color: #4caf50;
`;
export const YELLOW = styled.span`
  color: #fec65e;
`;

export default ColorScheme;
