"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Restaurant } from "@/types/database.types";
import {
  BG_SWATCHES,
  COPIED_TOAST_MS,
  DEFAULT_CTA,
  DEFAULT_DESC,
  DEFAULT_TABLE_COUNT,
  FORMATS,
  QR_STYLES,
} from "../constants";
import {
  buildMenuUrl,
  isDarkBackground,
  pricePerUnit,
  totalPrice,
} from "../helpers";
import {
  downloadPngFromSvg,
  downloadQrVariant,
  downloadSvgFromRef,
} from "../download";

/**
 * useQrCode — état + handlers de la page QR codes.
 * Charge restaurant, gère sélections (format/bg/qrStyle/cta/desc/tables),
 * expose handlers download (page + variant), copy URL.
 */
export function useQrCode() {
  const supabase = createClient();

  // restaurant
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  // copy toast
  const [copied, setCopied] = useState(false);

  // canvas
  const [activeTab, setActiveTab] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // selections
  const [formatIdx, setFormatIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);
  const [qrStyleIdx, setQrStyleIdx] = useState(0);
  const [cta, setCta] = useState(DEFAULT_CTA);
  const [desc, setDesc] = useState(DEFAULT_DESC);
  const [tableCount, setTableCount] = useState(DEFAULT_TABLE_COUNT);
  const [orderSent, setOrderSent] = useState(false);

  // derived
  const selectedFormat = FORMATS[formatIdx];
  const selectedBg = BG_SWATCHES[bgIdx];
  const selectedQrStyle = QR_STYLES[qrStyleIdx];
  const isDarkBg = isDarkBackground(bgIdx);
  const total = totalPrice(tableCount);
  const unitPrice = pricePerUnit(tableCount);
  const menuUrl = buildMenuUrl(restaurant?.slug);

  // load
  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setRestaurant(data);
      setLoading(false);
    };
    load();
  }, [supabase]);

  // handlers
  const handleDownload = (format: "png" | "svg") => {
    if (!svgRef.current) return;
    const base = `qr-${restaurant?.slug ?? "menu"}`;
    if (format === "svg") {
      downloadSvgFromRef(svgRef.current, `${base}.svg`);
    } else {
      downloadPngFromSvg(svgRef.current, `${base}.png`);
    }
  };

  const handleDownloadVariant = (
    fgColor: string,
    bgColor: string,
    fmt: "png" | "svg",
  ) => {
    if (!menuUrl) return;
    downloadQrVariant(
      menuUrl,
      fgColor,
      bgColor,
      fmt,
      `qr-variant-${restaurant?.slug ?? "menu"}`,
    );
  };

  const handleCopy = () => {
    if (!menuUrl) return;
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_TOAST_MS);
  };

  return {
    // state
    restaurant,
    loading,
    copied,
    activeTab,
    setActiveTab,
    svgRef,
    formatIdx,
    setFormatIdx,
    bgIdx,
    setBgIdx,
    qrStyleIdx,
    setQrStyleIdx,
    cta,
    setCta,
    desc,
    setDesc,
    tableCount,
    setTableCount,
    orderSent,
    setOrderSent,
    // derived
    selectedFormat,
    selectedBg,
    selectedQrStyle,
    isDarkBg,
    total,
    unitPrice,
    menuUrl,
    // handlers
    handleDownload,
    handleDownloadVariant,
    handleCopy,
  };
}
