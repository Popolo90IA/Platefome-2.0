"use client";

import type { GalleryDish } from "../_lib/types";
import { ModalImage } from "./_dish-modal/ModalImage";
import { ModalBody } from "./_dish-modal/ModalBody";

type DishDetailModalProps = {
  dish: GalleryDish | null;
  onClose: () => void;
};

/**
 * DishDetailModal — modal détaillée d'un plat de la gallery.
 * Click backdrop → close. Click contenu → stopPropagation.
 * L'écoute de Escape est faite côté HomePage (parent).
 */
export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  if (!dish) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "hsl(var(--void) / .88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "hsl(var(--abyss))",
          border: "1px solid hsl(var(--abyss) / .14)",
          borderRadius: 16,
          overflow: "hidden",
          maxWidth: 560,
          width: "100%",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,.9)",
          animation: "slideUp .35s cubic-bezier(.16,1,.3,1)",
          direction: "rtl",
        }}
      >
        <ModalImage dish={dish} onClose={onClose} />
        <ModalBody dish={dish} />
      </div>
    </div>
  );
}
