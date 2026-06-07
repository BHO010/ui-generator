import { Component, useState, useEffect, type ReactNode, type ErrorInfo } from "react";
import { transform } from "@babel/standalone";
import * as React from "react";
import type { LivePreviewProps } from "./LivePreview.types";
import { ErrorBox } from "./LivePreview.styles";
import { SCOPE } from "./LivePreview.scope";

class PreviewErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  render() {
    if (this.state.error) {
      return (
        <ErrorBox>
          <strong>Preview error</strong>
          <br />
          {this.state.error}
        </ErrorBox>
      );
    }
    return this.props.children;
  }
}

function extractComponentName(code: string): string | null {
  const match =
    code.match(/export\s+default\s+function\s+(\w+)/) ??
    code.match(/export\s+function\s+(\w+)/) ??
    code.match(/export\s+(?:default\s+)?const\s+(\w+)\s*[=:]/) ??
    code.match(/export\s+default\s+([A-Z]\w*)\s*;?$/m);
  return match?.[1] ?? null;
}

function stripForEval(code: string): string {
  return code
    .replace(/^import\s+.+?from\s+['"][^'"]+['"];?\n?/gms, "")
    .replace(/^export\s+(?:default\s+)?/gm, "");
}

export function LivePreview({ code }: LivePreviewProps) {
  const [node, setNode] = useState<ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const componentName = extractComponentName(code);
      if (!componentName) throw new Error("No exported function found in generated code.");

      const stripped = stripForEval(code);

      const { code: transpiled } = transform(`${stripped}\nreturn ${componentName};`, {
        presets: ["react"],
        filename: "preview.jsx",
        parserOpts: { allowReturnOutsideFunction: true },
      });

      const scopeKeys = Object.keys(SCOPE);
      const scopeValues = Object.values(SCOPE);
      // eslint-disable-next-line no-new-func
      const factory = new Function(...scopeKeys, transpiled!);
      const Comp = factory(...scopeValues) as React.ComponentType;

      setNode(React.createElement(Comp));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setNode(null);
    }
  }, [code]);

  if (error) {
    return (
      <ErrorBox>
        <strong>Preview error</strong>
        <br />
        {error}
      </ErrorBox>
    );
  }

  return <PreviewErrorBoundary key={code}>{node}</PreviewErrorBoundary>;
}
