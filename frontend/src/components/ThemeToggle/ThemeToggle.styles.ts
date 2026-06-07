import styled from "styled-components";
import { Colour } from "@lifesg/react-design-system/theme";
import type { ToggleProps } from "./ThemeToggle.types";

export const ModeToggle = styled.button<ToggleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  color: ${Colour["text-subtle"]};
  transition: color 0.15s;

  &:hover {
    color: ${Colour.text};
  }
`;

export const ToggleTrack = styled.div<ToggleProps>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: ${({ $isDark, theme }) =>
    $isDark ? Colour["bg-primary"]({ theme }) : Colour["bg-stronger"]({ theme })};
  position: relative;
  transition: background 0.25s;
  flex-shrink: 0;
`;

export const ToggleThumb = styled.div<ToggleProps>`
  position: absolute;
  top: 3px;
  left: ${({ $isDark }) => ($isDark ? "21px" : "3px")};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${Colour["bg-strong"]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const ModeLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  min-width: 32px;
`;
