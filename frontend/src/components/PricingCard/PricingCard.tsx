import { Pill } from "@lifesg/react-design-system/pill";
import { Button } from "@lifesg/react-design-system/button";
import { Divider } from "@lifesg/react-design-system/divider";
import { Typography } from "@lifesg/react-design-system/typography";
import {
  StyledCard,
  PillAnchor,
  PlanHeader,
  PriceRow,
  PerMonth,
  FeatureList,
  FeatureItem,
  TickIcon,
} from "./PricingCard.styles";

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
