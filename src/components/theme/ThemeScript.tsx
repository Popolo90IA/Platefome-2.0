import { THEME_STORAGE_KEY } from "./ThemeProvider";

interface ThemeScriptProps {
  /**
   * CSS selector for the wrapper that should receive the `.dark` class
   * before React mounts. Must be an element rendered _after_ this script.
   */
  targetSelector: string;
  /**
   * Fallback theme when the user has no stored preference. "system" follows
   * the OS. Use "dark" to make a surface dark-first (e.g. l'admin premium).
   */
  defaultTheme?: "light" | "dark" | "system";
}

/**
 * Inline script that resolves the user's theme preference (localStorage →
 * system) and applies the `.dark` class to the dashboard/admin wrapper
 * synchronously, _before_ paint. Prevents the white flash on dark mode.
 *
 * Render this at the top of the layout, just before the wrapper element
 * that carries `targetSelector` as id.
 */
export function ThemeScript({
  targetSelector,
  defaultTheme = "system",
}: ThemeScriptProps) {
  const code = `
    (function () {
      try {
        var k = ${JSON.stringify(THEME_STORAGE_KEY)};
        var d = ${JSON.stringify(defaultTheme)};
        var stored = window.localStorage.getItem(k);
        var resolved = stored;
        if (resolved !== "light" && resolved !== "dark") {
          resolved = (d === "dark" || d === "light")
            ? d
            : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        }
        var sel = ${JSON.stringify(targetSelector)};
        var el = document.querySelector(sel);
        if (el && resolved === "dark") el.classList.add("dark");
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
