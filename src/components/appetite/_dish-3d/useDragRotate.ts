"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * useDragRotate — drag-to-rotate + inertia + auto-spin for a 3D CSS element.
 * Tracks Y-angle (horizontal) and X-tilt (vertical), applies transform via RAF.
 * Returns the container ref and the pointer-down handlers to bind.
 */
export function useDragRotate() {
  const containerRef = useRef<HTMLDivElement>(null);

  const angleRef = useRef(0);
  const tiltRef = useRef(-15); // légère inclinaison vue de dessus
  const velRef = useRef(0);
  const tiltVelRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);

  const applyTransform = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = `rotateX(${tiltRef.current}deg) rotateZ(${angleRef.current}deg)`;
  }, []);

  // Boucle d'inertie
  useEffect(() => {
    const loop = () => {
      if (!draggingRef.current) {
        velRef.current *= 0.94;
        tiltVelRef.current *= 0.92;
        if (Math.abs(velRef.current) < 0.02) velRef.current += 0.25; // auto-spin
        angleRef.current += velRef.current;
        tiltRef.current += tiltVelRef.current;
        tiltRef.current += (-15 - tiltRef.current) * 0.03;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    isDragging.current = false;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    velRef.current = 0;
    tiltVelRef.current = 0;
    e.preventDefault();
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      const dy = e.clientY - lastYRef.current;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragging.current = true;
      velRef.current = dx * 0.55;
      tiltVelRef.current = dy * 0.3;
      angleRef.current += dx * 0.55;
      tiltRef.current = Math.max(-45, Math.min(10, tiltRef.current + dy * 0.3));
      lastXRef.current = e.clientX;
      lastYRef.current = e.clientY;
      applyTransform();
    },
    [applyTransform],
  );

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true;
    lastXRef.current = e.touches[0].clientX;
    lastYRef.current = e.touches[0].clientY;
    velRef.current = 0;
    tiltVelRef.current = 0;
  };

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!draggingRef.current) return;
      const dx = e.touches[0].clientX - lastXRef.current;
      const dy = e.touches[0].clientY - lastYRef.current;
      velRef.current = dx * 0.55;
      tiltVelRef.current = dy * 0.3;
      angleRef.current += dx * 0.55;
      tiltRef.current = Math.max(-45, Math.min(10, tiltRef.current + dy * 0.3));
      lastXRef.current = e.touches[0].clientX;
      lastYRef.current = e.touches[0].clientY;
      applyTransform();
      e.preventDefault();
    },
    [applyTransform],
  );

  const onTouchEnd = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return { containerRef, onMouseDown, onTouchStart };
}
