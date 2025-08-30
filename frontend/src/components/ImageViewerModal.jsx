import React, { useEffect, useRef, useState } from "react";

/**
 * Full-screen image viewer with zoom & pan.
 * - Click background or press ESC to close
 * - Wheel to zoom, drag to pan
 * - Double-click to reset
 */
export default function ImageViewerModal({ src, alt = "Visualization", onClose }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ active: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  // lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  // close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const clampZoom = (z) => Math.min(6, Math.max(0.3, z));

  const handleWheel = (e) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = (e.clientX - (rect?.left || 0) - pos.x) / zoom;
    const cy = (e.clientY - (rect?.top || 0) - pos.y) / zoom;
    const nextZoom = clampZoom(zoom * (e.deltaY < 0 ? 1.1 : 0.9));
    const nx = e.clientX - (rect?.left || 0) - cx * nextZoom;
    const ny = e.clientY - (rect?.top || 0) - cy * nextZoom;
    setZoom(nextZoom);
    setPos({ x: nx, y: ny });
  };

  const startDrag = (x, y) => setDrag({ active: true, startX: x, startY: y, origX: pos.x, origY: pos.y });
  const onMouseDown = (e) => !e.target.closest("[data-close]") && startDrag(e.clientX, e.clientY);
  const onMouseMove = (e) => drag.active && setPos({ x: drag.origX + (e.clientX - drag.startX), y: drag.origY + (e.clientY - drag.startY) });
  const onMouseUp = () => setDrag((d) => ({ ...d, active: false }));
  const onTouchStart = (e) => e.touches.length === 1 && startDrag(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e) => drag.active && e.touches.length === 1 && setPos({ x: drag.origX + (e.touches[0].clientX - drag.startX), y: drag.origY + (e.touches[0].clientY - drag.startY) });
  const onTouchEnd = () => setDrag((d) => ({ ...d, active: false }));
  const resetView = () => { setZoom(1); setPos({ x: 0, y: 0 }); };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div className="text-sm opacity-80">{alt}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => clampZoom(z * 0.9))} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">−</button>
          <span className="min-w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => clampZoom(z * 1.1))} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">+</button>
          <button onClick={resetView} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Reset</button>
          <a href={src} download="code_visualization.png" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Download</a>
          <button data-close onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Close</button>
        </div>
      </div>

      {/* Image canvas */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onDoubleClick={resetView}
        onClick={(e) => e.target === containerRef.current && onClose?.()}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="select-none will-change-transform absolute top-1/2 left-1/2"
          style={{
            transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            maxWidth: "none",
          }}
        />
      </div>
    </div>
  );
}
