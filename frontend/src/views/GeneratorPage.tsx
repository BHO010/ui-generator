import styled from "styled-components";
import { Colour, MediaQuery } from "@lifesg/react-design-system/theme";
import { TopNav } from "../components/TopNav";
import { PromptPanel } from "../components/PromptPanel";
import { ResultPanel } from "../components/ResultPanel";
import { useGenerateUIMutation } from "../features/generator/generatorApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectPrompt,
  selectProgress,
  setPrompt,
  resetProgress,
} from "../features/generator/generatorSlice";

export function GeneratorPage() {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(selectPrompt);
  const progress = useAppSelector(selectProgress);

  const [generateUI, { isLoading, isSuccess, isError, data, reset }] =
    useGenerateUIMutation();

  function handleGenerate() {
    if (!prompt.trim() || isLoading) return;
    dispatch(resetProgress());
    generateUI({ prompt: prompt.trim() });
  }

  function handleReset() {
    reset();
    dispatch(setPrompt(""));
    dispatch(resetProgress());
  }

  return (
    <PageWrapper>
      <TopNav />
      <MainLayout>
        <PromptPanel isLoading={isLoading} onGenerate={handleGenerate} />
        <ResultPanel
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={data}
          onReset={handleReset}
          progress={progress}
        />
      </MainLayout>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${Colour.bg};
`;

const MainLayout = styled.main`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  gap: 24px;
  padding: 32px;
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  ${MediaQuery.MaxWidth.md} {
    grid-template-columns: 1fr;
    padding: 20px 16px;
    gap: 20px;
  }
`;
