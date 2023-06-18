import styled from "styled-components";

const NeonMsg = styled.span<{ color: string }>`
  text-shadow: ${(props) =>
    props.color
      ? `0 0 10px ${props.color},0 0 20px ${props.color},0 0 40px ${props.color},0 0 80px ${props.color},0 0 120px ${props.color};`
      : ""};
`;

export { NeonMsg };
