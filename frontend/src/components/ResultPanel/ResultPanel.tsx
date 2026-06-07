import { Button } from "@lifesg/react-design-system/button";
import { Typography } from "@lifesg/react-design-system/typography";
import { OutputPanel } from "../OutputPanel";
import type { ResultPanelProps } from "./ResultPanel.types";
import {
  Panel,
  EmptyState,
  SpinnerRing,
  ProgressBar,
  ProgressFill,
  OutputWrapper,
  OutputHeader,
} from "./ResultPanel.styles";

export function ResultPanel({
  isLoading,
  isSuccess,
  isError,
  data,
  onReset,
  progress,
}: ResultPanelProps) {
  const isIdle = !isLoading && !isSuccess && !isError;

  return (
    <Panel>
      {isIdle && (
        <EmptyState>
          <Typography.HeadingXS weight="semibold" style={{ marginTop: "16px" }}>
            Your generated UI will appear here
          </Typography.HeadingXS>
          <Typography.BodyMD
            style={{ marginTop: "8px", maxWidth: "280px", textAlign: "center" }}
          >
            Enter a prompt on the left and click Generate UI to get started.
          </Typography.BodyMD>
        </EmptyState>
      )}

      {isLoading && (
        <EmptyState>
          <SpinnerRing aria-label="Loading…" />
          <Typography.HeadingXS weight="semibold" style={{ marginTop: "20px" }}>
            Generating your UI...
          </Typography.HeadingXS>
          <Typography.BodyMD style={{ marginTop: "6px" }}>
            {progress != null ? `${progress}%` : "This will just take a moment."}
          </Typography.BodyMD>
          <ProgressBar>
            <ProgressFill $progress={progress ?? undefined} />
          </ProgressBar>
        </EmptyState>
      )}

      {isError && (
        <EmptyState>
          <Typography.HeadingXS weight="semibold" style={{ marginTop: "16px" }}>
            Something went wrong
          </Typography.HeadingXS>
          <Typography.BodyMD style={{ marginTop: "8px", textAlign: "center" }}>
            The request failed. Please try again.
          </Typography.BodyMD>
          <Button.Default
            styleType="secondary"
            onClick={onReset}
            style={{ marginTop: "16px" }}
          >
            Try again
          </Button.Default>
        </EmptyState>
      )}

      {isSuccess && data && (
        <OutputWrapper>
          <OutputHeader>
            <Typography.HeadingSM weight="semibold">
              Generated Component
            </Typography.HeadingSM>
            <Button.Default styleType="light" onClick={onReset}>
              Reset
            </Button.Default>
          </OutputHeader>
          <OutputPanel result={data} />
        </OutputWrapper>
      )}
    </Panel>
  );
}
