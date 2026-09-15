import React, { useRef, useState, useEffect } from 'react';

interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  snap?: boolean;
}

export function CarouselContainer({
  children,
  className = '',
  snap = true,
}: CarouselContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Mouse wheel vertical-to-horizontal translation for desktop PC
    const handleWheel = (e: WheelEvent) => {
      // If user is doing native horizontal trackpad scroll, respect it
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      // Allow vertical page scroll if already at extremes
      const atStart = scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = scrollLeft >= maxScroll - 1 && e.deltaY > 0;

      if (!atStart && !atEnd) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.2,
          behavior: 'auto',
        });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Click & Drag-to-scroll implementation (Desktop mouse only, no touch interference)
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle primary mouse button
    if (e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const distance = x - startXRef.current;

    // Small threshold before starting drag to avoid misinterpreting simple clicks
    if (Math.abs(distance) > 4) {
      hasMovedRef.current = true;
      e.preventDefault();
      el.scrollLeft = scrollLeftRef.current - distance;
    }
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Prevent accidental clicks on child links/cards if the user was actively dragging
  const onClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClickCapture={onClickCapture}
      className={`flex gap-4 overflow-x-auto pb-4 no-scrollbar mask-fade-right select-none ${
        snap && !isDragging ? 'horizontal-snap' : ''
      } ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab md:cursor-grab'} ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-x pan-y',
      }}
    >
      {children}
    </div>
  );
}
