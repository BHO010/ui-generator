export const EXAMPLE_PROMPTS = [
  "A pricing card for a SaaS product with monthly billing",
  "A user profile card with avatar, name, and social links",
  "A subscription plan comparison with feature checkmarks",
];

export const PLACEHOLDER_CODE = `import { Card } from "@lifesg/react-design-system/card";
import { Pill } from "@lifesg/react-design-system/pill";
import { Button } from "@lifesg/react-design-system/button";
import { Divider } from "@lifesg/react-design-system/divider";
import { Typography } from "@lifesg/react-design-system/typography";
import { Colour } from "@lifesg/react-design-system/theme";
import { TickCircleFillIcon } from "@lifesg/react-icons/tick-circle-fill";
import styled from "styled-components";

const features = [
  "Access to all core features",
  "Up to 10 team members",
  "50 GB cloud storage",
  "Priority email support",
  "Advanced analytics dashboard",
  "Monthly usage reports",
];

export function PricingCard() {
  return (
    <StyledCard>
      <PillAnchor>
        <Pill type="solid" colorType="primary">
          Most Popular
        </Pill>
      </PillAnchor>

      <PlanHeader>
        <Typography.HeadingSM weight="semibold">Pro Plan</Typography.HeadingSM>
        <PriceRow>
          <Typography.HeadingXL weight="bold">$29</Typography.HeadingXL>
          <PerMonth>/ month</PerMonth>
        </PriceRow>
        <Typography.BodySM>Billed annually. Cancel anytime.</Typography.BodySM>
      </PlanHeader>

      <Divider />

      <FeatureList>
        {features.map((feature) => (
          <FeatureItem key={feature}>
            <TickIcon aria-hidden="true" />
            <Typography.BodyMD>{feature}</Typography.BodyMD>
          </FeatureItem>
        ))}
      </FeatureList>

      <Button.Default styleType="default" style={{ width: "100%", marginTop: "8px" }}>
        Get Started
      </Button.Default>

      <Typography.BodyXS style={{ textAlign: "center", marginTop: "12px" }}>
        No credit card required
      </Typography.BodyXS>
    </StyledCard>
  );
}

const StyledCard = styled(Card)\`
  position: relative;
  padding: 32px;
  border: 2px solid \${Colour["border-primary-subtle"]};
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
\`;

const PillAnchor = styled.div\`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
\`;

const PlanHeader = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 6px;
\`;

const PriceRow = styled.div\`
  display: flex;
  align-items: baseline;
  gap: 4px;
\`;

const PerMonth = styled.span\`
  font-size: 14px;
  color: \${Colour["text-subtle"]};
  align-self: flex-end;
  margin-bottom: 4px;
\`;

const FeatureList = styled.ul\`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
\`;

const FeatureItem = styled.li\`
  display: flex;
  align-items: flex-start;
  gap: 10px;
\`;

const TickIcon = styled(TickCircleFillIcon)\`
  color: \${Colour["icon-primary"]};
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
\`;`;
