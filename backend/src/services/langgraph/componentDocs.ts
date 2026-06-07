export const COMPONENT_DOCS = `
=== AVAILABLE COMPONENTS ===
Import ONLY from the packages listed below. No other imports are allowed.
All listed symbols are already in scope — write the import statements anyway so the
code is self-contained, but know the preview will only work with these exact paths.

──────────────────────────────────────────────────────
1. Card  ─  import { Card } from "@lifesg/react-design-system/card"
   • A plain surface/container div.
   • Props: children, ...HTMLDivAttributes
   • Extend with styled-components: const StyledCard = styled(Card)\`...\`
   • Example:
       <Card>
         <Typography.HeadingMD>Title</Typography.HeadingMD>
       </Card>

──────────────────────────────────────────────────────
2. Button  ─  import { Button } from "@lifesg/react-design-system/button"
   • MUST use a sub-variant — never bare <Button>.
   • Variants: Button.Default | Button.Small | Button.Large
   • Key props:
       styleType?: "default" | "secondary" | "light" | "link"
       danger?: boolean
       loading?: boolean
       disabled?: boolean
       onClick?: () => void
   • Example:
       <Button.Default styleType="default" onClick={() => {}}>Submit</Button.Default>
       <Button.Default styleType="secondary">Cancel</Button.Default>

──────────────────────────────────────────────────────
3. Typography  ─  import { Typography } from "@lifesg/react-design-system/typography"
   • Use for ALL text — never use raw <p>, <h1>–<h6>, or <span> for content text.
   • Heading variants (renders as <h*>):
       Typography.HeadingXXL, HeadingXL, HeadingLG, HeadingMD, HeadingSM, HeadingXS
   • Body variants (renders as <p>):
       Typography.BodyBL, BodyMD, BodySM, BodyXS
   • Link variants (renders as <a>):
       Typography.LinkBL, LinkMD, LinkSM, LinkXS
   • Example:
       <Typography.HeadingMD>Section Title</Typography.HeadingMD>
       <Typography.BodyMD>Some paragraph text here.</Typography.BodyMD>

──────────────────────────────────────────────────────
4. Pill  ─  import { Pill } from "@lifesg/react-design-system/pill"
   • Use for status badges and labels.
   • Required props: type ("outline" | "solid")
   • Optional props:
       colorType?: "black" | "grey" | "green" | "yellow" | "red" | "blue" | "primary"
       icon?: JSX.Element
   • Example:
       <Pill type="solid" colorType="green">Active</Pill>
       <Pill type="outline" colorType="red">Expired</Pill>

──────────────────────────────────────────────────────
5. Divider  ─  import { Divider } from "@lifesg/react-design-system/divider"
   • A horizontal rule / separator.
   • Optional props:
       thickness?: number        (px, default 1)
       lineStyle?: "solid" | "dashed"
       color?: string
   • Example:
       <Divider />
       <Divider thickness={2} lineStyle="dashed" />

──────────────────────────────────────────────────────
6. Colour  ─  import { Colour } from "@lifesg/react-design-system/theme"
   • Colour tokens are FUNCTIONS — call them inside styled-components interpolations.
   • NEVER hardcode hex values. Always use Colour.* tokens.
   • Common semantic tokens:
       Colour.text              — primary text colour
       Colour["text-subtle"]    — secondary / muted text
       Colour["text-inverse"]   — text on dark surfaces
       Colour["text-error"]     — error/danger text
       Colour["bg-primary"]     — page/card background
       Colour["bg-strong"]      — elevated surface background
       Colour["bg-stronger"]    — further elevated surface
       Colour["border"]         — default border
       Colour["border-strong"]  — prominent border
       Colour["primary"]        — brand accent (fills, icons)
       Colour["accent-light"]   — light accent tint
   • Correct usage in styled-components:
       const Box = styled.div\`
         background: \${Colour["bg-strong"]};
         color: \${Colour.text};
         border: 1px solid \${Colour["border"]};
       \`

──────────────────────────────────────────────────────
7. TickCircleFillIcon  ─  import { TickCircleFillIcon } from "@lifesg/react-icons/tick-circle-fill"
   • SVG icon component. Style via styled-components.
   • Example:
       const Icon = styled(TickCircleFillIcon)\`
         width: 20px;
         height: 20px;
         color: \${Colour["primary"]};
       \`
       // render: <Icon />

──────────────────────────────────────────────────────
8. Avatar  ─  import { Avatar } from "@lifesg/react-design-system/avatar"
   • Displays a user avatar — accepts text initials or a JSX element (e.g. an <img>).
   • Required props: children (string of initials, or a JSX.Element like <img>)
   • Optional props:
       sizeType?: "default" | "small"
   • Example:
       <Avatar>JD</Avatar>
       <Avatar sizeType="small">AB</Avatar>
       <Avatar><img src={profileUrl} alt="User" /></Avatar>

──────────────────────────────────────────────────────
9. styled  ─  import styled from "styled-components"
   • Use for all custom layout and styling.
   • Define styled components AFTER the main function, at the bottom of the file.
   • Access theme tokens via Colour.*:
       const Wrapper = styled.div\`
         padding: 24px;
         background: \${Colour["bg-primary"]};
       \`

=== STRICT RULES ===
- Only import from the 9 packages above — no other libraries or @lifesg sub-packages.
- No raw HTML text elements (<p>, <h1>–<h6>, <span>, <label>) for visible text — use Typography.*.
- No hardcoded colour hex/rgb values — use Colour.* tokens inside styled-components.
- Button must always be Button.Default, Button.Small, or Button.Large.
- No props on the exported component function.
`
