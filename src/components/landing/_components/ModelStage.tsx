"use client";

import dynamic from "next/dynamic";
import { ModelStageNav } from "./ModelStageNav";

const HeroCanvas = dynamic(
  () => import("@/components/appetite/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

interface Props {
  modelUrl: string;
  count: number;
  activeIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}

/**
 * ModelStage — colonne centre : HeroCanvas + nav arrows + dots.
 */
export function ModelStage({
  modelUrl,
  count,
  activeIdx,
  onPrev,
  onNext,
  onSelect,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 360,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HeroCanvas modelUrl={modelUrl} />
      <ModelStageNav
        count={count}
        activeIdx={activeIdx}
        onPrev={onPrev}
        onNext={onNext}
        onSelect={onSelect}
      />
    </div>
  );
}
