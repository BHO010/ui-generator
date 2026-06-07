import styled from "styled-components";
import { Colour } from "@lifesg/react-design-system/theme";

export const ErrorBox = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: ${Colour["bg-strong"]};
  border: 1px solid ${Colour["border-strong"]};
  color: ${Colour["text-error"]};
  font-size: 13px;
  line-height: 1.6;
`;
