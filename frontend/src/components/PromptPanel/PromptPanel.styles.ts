import styled from "styled-components";
import { Colour, Font } from "@lifesg/react-design-system/theme";
import { Textarea } from "@lifesg/react-design-system/input-textarea";
import { Button } from "@lifesg/react-design-system/button";
import type { CharTextProps } from "./PromptPanel.types";

export const Panel = styled.section`
  background: ${Colour["bg-strong"]};
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;
  position: sticky;
  top: 88px;
  border: 1px solid ${Colour.border};

  @media (max-width: 900px) {
    position: static;
  }
`;

export const SectionLabel = styled.div``;

export const StyledTextarea = styled(Textarea)`
  width: 100%;
  max-width: 100%;
  resize: vertical;
`;

export const CharCount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -8px;
`;

export const CharText = styled.span<CharTextProps>`
  font-size: 12px;
  color: ${({ $over, theme }) =>
    $over ? Colour["text-error"]({ theme }) : Colour["text-subtler"]({ theme })};
`;

export const HintText = styled.span`
  font-size: 12px;
  color: ${Colour["text-subtlest"]};
`;

export const ExamplesSection = styled.div`
  border-top: 1px solid ${Colour.border};
  padding-top: 16px;
`;

export const ExampleLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${Colour["text-subtler"]};
  margin-bottom: 8px;
`;

export const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ExampleChipButton = styled(Button.Small)`
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  margin: 5px;
  font-size: ${Font['body-xs-semibold']};
  color: ${Colour.text}
`;
