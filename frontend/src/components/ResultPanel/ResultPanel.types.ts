import type { GeneratedComponent } from "../../features/generator/generatorApi";

export interface ResultPanelProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: GeneratedComponent;
  onReset: () => void;
  progress?: number | null;
}

export interface ProgressFillProps {
  $progress?: number;
}
