import styled, { css, keyframes } from "styled-components";
import { Colour } from "@lifesg/react-design-system/theme";
import type { ProgressFillProps } from "./ResultPanel.types";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const progressAnim = keyframes`
  0%   { width: 0%; }
  60%  { width: 75%; }
  100% { width: 95%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Panel = styled.section`
  background: ${Colour["bg-strong"]};
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  min-height: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${Colour.border};
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  animation: ${fadeIn} 0.3s ease;
  color: ${Colour["text-subtle"]};
`;

export const SpinnerRing = styled.div`
  width: 52px;
  height: 52px;
  border: 4px solid ${Colour["bg-primary-subtlest"]};
  border-top-color: ${Colour["bg-primary"]};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const ProgressBar = styled.div`
  width: 220px;
  height: 4px;
  background: ${Colour["bg-primary-subtlest"]};
  border-radius: 999px;
  overflow: hidden;
  margin-top: 20px;
`;

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background: ${Colour["bg-primary"]};
  border-radius: 999px;
  ${({ $progress }) =>
    $progress !== undefined
      ? css`
          width: ${$progress}%;
          transition: width 0.4s ease-out;
        `
      : css`
          animation: ${progressAnim} 2.5s ease-out forwards;
        `}
`;

export const OutputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  animation: ${fadeIn} 0.4s ease;
`;

export const OutputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
