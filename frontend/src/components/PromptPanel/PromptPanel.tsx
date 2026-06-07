import { Button } from "@lifesg/react-design-system/button";
import { Typography } from "@lifesg/react-design-system/typography";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPrompt, setPrompt } from "../../features/generator/generatorSlice";
import { EXAMPLE_PROMPTS } from "../../constants/generator";
import type { PromptPanelProps } from "./PromptPanel.types";
import {
  Panel,
  SectionLabel,
  StyledTextarea,
  CharCount,
  CharText,
  HintText,
  ExamplesSection,
  ExampleLabel,
  ExampleList,
  ExampleChipButton,
} from "./PromptPanel.styles";

export function PromptPanel({ isLoading, onGenerate }: PromptPanelProps) {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(selectPrompt);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      onGenerate();
    }
  }

  return (
    <Panel>
      <SectionLabel>
        <Typography.HeadingMD weight="bold">Describe your UI</Typography.HeadingMD>
        <Typography.BodyMD style={{ marginTop: "6px" }}>
          Enter a prompt and we'll generate a react UI component for you.
        </Typography.BodyMD>
      </SectionLabel>

      <StyledTextarea
        placeholder="e.g. A pricing card for a pro subscription with a list of features and a call-to-action button..."
        value={prompt}
        onChange={(e) => dispatch(setPrompt(e.target.value))}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={6}
        aria-label="UI generation prompt"
      />

      <Button.Default
        styleType="default"
        loading={isLoading}
        disabled={!prompt.trim() || isLoading}
        onClick={onGenerate}
        style={{ width: "100%" }}
      >
        {isLoading ? "Generating..." : "Generate UI"}
      </Button.Default>

      <ExamplesSection>
        <ExampleLabel>Try an example</ExampleLabel>
        <ExampleList>
          {EXAMPLE_PROMPTS.map((ex) => (
            <ExampleChipButton
              key={ex}
              styleType="light"
              disabled={isLoading}
              onClick={() => dispatch(setPrompt(ex))}
            >
              {ex}
            </ExampleChipButton>
          ))}
        </ExampleList>
      </ExamplesSection>
    </Panel>
  );
}
