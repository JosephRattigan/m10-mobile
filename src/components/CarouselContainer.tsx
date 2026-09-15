import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  showArrows?: boolean;
  scrollStep?: number;
  snap?: boolean;
  arrowPosition?: 'header' | 'sides' | 'floating';
}

export function CarouselContainer({
  children,
  className = '',
  showArrows = true,
  scrollStep,
  snap = true,
  arrowPosition = 'sides',
}: CarouselContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Update scroll status for arrows
  const checkScrollability = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    // Mouse wheel vertical-to-horizontal translation for desktop PC
    const handleWheel = (e: WheelEvent) => {
      // If user is doing horizontal trackpad scroll, respect it
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
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [checkScrollability]);

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

    // Movement threshold before starting drag
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

  // Prevent accidental clicks on child links/cards if the user was dragging
  const onClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const distance = scrollStep || el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group/carousel">
      {/* Left Desktop Arrow Button */}
      {showArrows && canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white hover:text-emerald-400 border border-white/20 items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>
      )}

      {/* Right Desktop Arrow Button */}
      {showArrows && canScrollRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white hover:text-emerald-400 border border-white/20 items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      )}

      {/* Scrollable Container */}
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
    </div>
  );
}
