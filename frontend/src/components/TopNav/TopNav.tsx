import { Typography } from "@lifesg/react-design-system/typography";
import { ThemeToggle } from "../ThemeToggle";
import { Header, BrandRow } from "./TopNav.styles";

export function TopNav() {
  return (
    <Header>
      <BrandRow>
        <Typography.HeadingXS weight="semibold">React UI Generator</Typography.HeadingXS>
      </BrandRow>
      <ThemeToggle />
    </Header>
  );
}
