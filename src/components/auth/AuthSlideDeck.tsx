"use client";

import { BrandPanel } from "./_slide-deck/BrandPanel";
import { LoginPanel } from "./_slide-deck/LoginPanel";
import { SignupPanel } from "./_slide-deck/SignupPanel";
import { useSlideDeck } from "./_slide-deck/useSlideDeck";

export function AuthSlideDeck({
  initialPanel,
}: {
  initialPanel: "login" | "signup";
}) {
  const { displayPanel, switchTo, slideStyle } = useSlideDeck(initialPanel);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "hsl(var(--void))",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={slideStyle("brand")}>
          <BrandPanel panel={displayPanel} />
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 32,
            height: "100%",
            background:
              "linear-gradient(to left, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 52px",
          background: "hsl(var(--sand))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,.10) 0%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        <div
          style={{
            ...slideStyle("form"),
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {displayPanel === "login" ? (
            <LoginPanel onSwitch={() => switchTo("signup")} />
          ) : (
            <SignupPanel onSwitch={() => switchTo("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
