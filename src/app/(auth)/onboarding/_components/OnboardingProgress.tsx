"use client";

import { Fragment } from "react";
import { S, STEPS } from "../_lib/constants";

/* ── Progress strip (step circles + connecting lines) ── */
export function OnboardingProgress({ step }: { step: number }) {
  return (
    <div
      style={{
        padding: "28px 36px 0",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", maxWidth: 720, margin: "0 auto" }}>
        {STEPS.map((s, i) => {
          const state = s.id < step ? "done" : s.id === step ? "now" : "pending";
          return (
            <Fragment key={s.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: i === STEPS.length - 1 ? "0 0 auto" : 1,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 99,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background:
                      state === "done" ? S.accent : state === "now" ? S.fog : S.abyss,
                    color:
                      state === "done"
                        ? "white"
                        : state === "now"
                          ? "hsl(28,15%,12%)"
                          : S.dim,
                    border: state === "pending" ? `1px solid ${S.line}` : "none",
                    boxShadow: state === "now" ? `0 0 0 5px hsl(28,15%,30%,.3)` : "none",
                  }}
                >
                  {state === "done" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-mono" style={{ fontSize: 12, fontWeight: 600 }}>
                      {s.id}
                    </span>
                  )}
                </div>
                <span
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    color:
                      state === "done" ? S.subtle : state === "now" ? S.fog : S.dim,
                  }}
                >
                  {s.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: s.id < step ? S.accent : S.line,
                    margin: "0 14px",
                    minWidth: 30,
                  }}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
