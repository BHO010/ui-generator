import styled from "styled-components";
import { Card } from "@lifesg/react-design-system/card";
import { Colour } from "@lifesg/react-design-system/theme";
import { TickCircleFillIcon } from "@lifesg/react-icons/tick-circle-fill";

export const StyledCard = styled(Card)`
  position: relative;
  padding: 32px;
  border: 2px solid ${Colour["border-primary-subtle"]};
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PillAnchor = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const PerMonth = styled.span`
  font-size: 14px;
  color: ${Colour["text-subtle"]};
  align-self: flex-end;
  margin-bottom: 4px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const TickIcon = styled(TickCircleFillIcon)`
  color: ${Colour["icon-primary"]};
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
`;
