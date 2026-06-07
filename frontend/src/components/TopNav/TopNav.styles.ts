import styled from "styled-components";
import { Colour } from "@lifesg/react-design-system/theme";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: ${Colour["bg-strong"]};
  border-bottom: 1px solid ${Colour.border};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
