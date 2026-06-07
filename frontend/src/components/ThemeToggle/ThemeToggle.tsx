import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectColourMode, toggleColourMode } from "../../features/theme/themeSlice";
import { ModeToggle, ToggleTrack, ToggleThumb, ModeLabel } from "./ThemeToggle.styles";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectColourMode) === "dark";

  return (
    <ModeToggle
      onClick={() => dispatch(toggleColourMode())}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      $isDark={isDark}
    >
      <ToggleTrack $isDark={isDark}>
        <ToggleThumb $isDark={isDark}>{isDark ? "☾" : "☀"}</ToggleThumb>
      </ToggleTrack>
      <ModeLabel>{isDark ? "Dark" : "Light"}</ModeLabel>
    </ModeToggle>
  );
}
