import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSThemeProvider, LifeSGTheme } from "@lifesg/react-design-system/theme";
import { useAppSelector } from "./store/hooks";
import { selectColourMode } from "./features/theme/themeSlice";
import { GeneratorPage } from "./views/GeneratorPage";

export default function App() {
  const colourMode = useAppSelector(selectColourMode);
  const theme = colourMode === "dark" ? LifeSGTheme.dark : LifeSGTheme.light;

  return (
    <DSThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
        </Routes>
      </BrowserRouter>
    </DSThemeProvider>
  );
}
