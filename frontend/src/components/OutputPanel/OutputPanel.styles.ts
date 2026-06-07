import styled from "styled-components";
import { Colour } from "@lifesg/react-design-system/theme";
import { Card } from "@lifesg/react-design-system";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

export const PromptEcho = styled(Card)`
  background: ${Colour["bg-primary-subtlest"]};
  border: 1px solid ${Colour["border-primary-subtle"]};
  border-radius: 8px;
  padding: 12px 16px;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const MetaBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${Colour["text-subtle"]};
  flex-shrink: 0;
`;

export const MetaDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
`;

export const MetaSep = styled.span`
  color: ${Colour["text-subtler"]};
`;

export const PreviewPane = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  min-height: 420px;
  background: ${Colour.bg};
  border-radius: 0 0 12px 12px;
`;

export const CodePane = styled.div`
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

export const CodeBlock = styled.pre`
  background: ${Colour["bg-inverse"]};
  color: ${Colour["text-inverse"]};
  padding: 24px;
  overflow-x: auto;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  border-radius: 0 0 12px 12px;
  min-height: 420px;

  code {
    font-family: inherit;
    background: none;
    padding: 0;
    color: inherit;
  }
`;
