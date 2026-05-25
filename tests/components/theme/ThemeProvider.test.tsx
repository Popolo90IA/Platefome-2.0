import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ThemeProvider,
  THEME_STORAGE_KEY,
  useTheme,
} from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function Probe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>set-dark</button>
      <button onClick={() => setTheme("light")}>set-light</button>
    </div>
  );
}

function renderWithTarget(
  ui: React.ReactNode,
  { stored }: { stored?: string } = {},
) {
  if (stored !== undefined) {
    window.localStorage.setItem(THEME_STORAGE_KEY, stored);
  }
  document.body.innerHTML = '<div id="probe-root"></div>';
  return render(
    <ThemeProvider targetSelector="#probe-root">{ui}</ThemeProvider>,
    { container: document.getElementById("probe-root")! },
  );
}

describe("<ThemeProvider />", () => {
  beforeEach(() => {
    window.localStorage.clear();
    // Default system to light unless a test overrides it
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("resolves to light by default when no preference and system is light", () => {
    renderWithTarget(<Probe />);
    expect(screen.getByTestId("theme").textContent).toBe("system");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    expect(document.getElementById("probe-root")?.classList.contains("dark")).toBe(false);
  });

  it("reads dark preference from localStorage on mount", () => {
    renderWithTarget(<Probe />, { stored: "dark" });
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(document.getElementById("probe-root")?.classList.contains("dark")).toBe(true);
  });

  it("applies the .dark class to the target when switching to dark", async () => {
    const user = userEvent.setup();
    renderWithTarget(<Probe />);
    const target = document.getElementById("probe-root")!;
    expect(target.classList.contains("dark")).toBe(false);
    await user.click(screen.getByText("set-dark"));
    expect(target.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("removes the .dark class when switching back to light", async () => {
    const user = userEvent.setup();
    renderWithTarget(<Probe />, { stored: "dark" });
    const target = document.getElementById("probe-root")!;
    expect(target.classList.contains("dark")).toBe(true);
    await user.click(screen.getByText("set-light"));
    expect(target.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("falls back to system preference when system is dark", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("dark"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    renderWithTarget(<Probe />);
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("throws when useTheme is called outside provider", () => {
    // Swallow the error log from React
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      // Render into a fresh container without provider
      render(<Probe />);
    }).toThrow(/useTheme/);
    spy.mockRestore();
  });
});

describe("<ThemeToggle />", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders an accessible toggle button", () => {
    renderWithTarget(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-label");
  });

  it("flips the theme on click", async () => {
    const user = userEvent.setup();
    renderWithTarget(<ThemeToggle />);
    const target = document.getElementById("probe-root")!;
    expect(target.classList.contains("dark")).toBe(false);
    await user.click(screen.getByRole("button"));
    expect(target.classList.contains("dark")).toBe(true);
    await user.click(screen.getByRole("button"));
    expect(target.classList.contains("dark")).toBe(false);
  });
});

describe("ThemeProvider — direct setTheme", () => {
  it("supports programmatic setTheme via act()", () => {
    window.localStorage.clear();
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    let captured: ReturnType<typeof useTheme> | null = null;
    function Capture() {
      captured = useTheme();
      return null;
    }
    document.body.innerHTML = '<div id="probe-root"></div>';
    render(
      <ThemeProvider targetSelector="#probe-root">
        <Capture />
      </ThemeProvider>,
      { container: document.getElementById("probe-root")! },
    );
    act(() => captured!.setTheme("dark"));
    expect(captured!.resolvedTheme).toBe("dark");
    expect(document.getElementById("probe-root")?.classList.contains("dark")).toBe(true);
  });
});
