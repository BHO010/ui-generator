import { Tab } from "@lifesg/react-design-system/tab";
import { Typography } from "@lifesg/react-design-system/typography";
import { LivePreview } from "../LivePreview";
import { PricingCard } from "../PricingCard";
import type { OutputPanelProps } from "./OutputPanel.types";
import {
  Container,
  PromptEcho,
  MetaRow,
  MetaBadge,
  MetaDot,
  MetaSep,
  PreviewPane,
  CodePane,
  CodeBlock,
} from "./OutputPanel.styles";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

export function OutputPanel({ result }: OutputPanelProps) {
  const formattedTime = new Date(result.generatedAt).toLocaleTimeString();

  return (
    <Container>
      <PromptEcho>
        <MetaRow>
          <Typography.BodyXS>Generated from prompt:</Typography.BodyXS>
          <MetaBadge>
            <MetaDot />
            <Typography.BodyXS>{result.model}</Typography.BodyXS>
            <MetaSep>·</MetaSep>
            <Typography.BodyXS>{formattedTime}</Typography.BodyXS>
          </MetaBadge>
        </MetaRow>
        <Typography.BodySM style={{ fontStyle: "italic", marginTop: "4px" }}>
          "{result.prompt}"
        </Typography.BodySM>
      </PromptEcho>

      <Tab initialActive={0} fullWidthIndicatorLine>
        <Tab.Item title="Preview">
          <PreviewPane>
            {USE_MOCK ? <PricingCard /> : <LivePreview code={result.generatedCode} />}
          </PreviewPane>
        </Tab.Item>
        <Tab.Item title="Code">
          <CodePane>
            <CodeBlock>
              <code>{result.generatedCode}</code>
            </CodeBlock>
          </CodePane>
        </Tab.Item>
      </Tab>
    </Container>
  );
}
