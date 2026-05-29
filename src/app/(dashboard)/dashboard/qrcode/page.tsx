"use client";

import { useQrCode } from "./_lib/hooks/useQrCode";
import { QrEmptyState } from "./_components/QrEmptyState";
import { QrHeader } from "./_components/QrHeader";
import { FormatPickerCard } from "./_components/FormatPickerCard";
import { ColorsPickerCard } from "./_components/ColorsPickerCard";
import { ContentInputsCard } from "./_components/ContentInputsCard";
import { PerTableCard } from "./_components/PerTableCard";
import { ShippingCard } from "./_components/ShippingCard";
import { CanvasPanel } from "./_components/CanvasPanel";
import { QrActionsBar } from "./_components/QrActionsBar";

/**
 * QRCodePage — orchestrateur : sidebar (5 cards) + canvas + actions bar.
 */
export default function QRCodePage() {
  const s = useQrCode();

  if (s.loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 0",
        }}
      >
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!s.restaurant) {
    return <QrEmptyState />;
  }

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))" }}>
      <QrHeader
        onDownloadSvg={() => s.handleDownload("svg")}
        onDownloadPng={() => s.handleDownload("png")}
      />

      <div
        className="qr-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FormatPickerCard
            formatIdx={s.formatIdx}
            onSelect={s.setFormatIdx}
          />
          <ColorsPickerCard
            bgIdx={s.bgIdx}
            qrStyleIdx={s.qrStyleIdx}
            onSelectBg={s.setBgIdx}
            onSelectQrStyle={s.setQrStyleIdx}
          />
          <ContentInputsCard
            cta={s.cta}
            desc={s.desc}
            onCtaChange={s.setCta}
            onDescChange={s.setDesc}
          />
          <PerTableCard tableCount={s.tableCount} onChange={s.setTableCount} />
          <ShippingCard
            tableCount={s.tableCount}
            formatLabel={s.selectedFormat.label}
            total={s.total}
            orderSent={s.orderSent}
            onOrder={() => s.setOrderSent(true)}
          />
        </div>

        <CanvasPanel
          activeTab={s.activeTab}
          onSelectTab={s.setActiveTab}
          formatIdx={s.formatIdx}
          format={s.selectedFormat}
          bg={s.selectedBg}
          qrStyle={s.selectedQrStyle}
          menuUrl={s.menuUrl}
          cta={s.cta}
          desc={s.desc}
          isDarkBg={s.isDarkBg}
          tableCount={s.tableCount}
          restaurantName={s.restaurant.name}
          svgRef={s.svgRef}
          onPickStyle={s.setQrStyleIdx}
          onDownloadVariant={s.handleDownloadVariant}
        />
      </div>

      <QrActionsBar
        menuUrl={s.menuUrl}
        copied={s.copied}
        restaurantSlug={s.restaurant.slug}
        onCopy={s.handleCopy}
        onDownloadPng={() => s.handleDownload("png")}
        onDownloadSvg={() => s.handleDownload("svg")}
      />
    </div>
  );
}
