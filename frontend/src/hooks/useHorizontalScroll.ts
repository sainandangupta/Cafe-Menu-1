'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const canLeft = el.scrollLeft > 2;
    const canRight = Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 2;
    setCanScrollLeft(canLeft);
    setCanScrollRight(canRight);

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      const pct = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100));
      setScrollProgress(Math.round(pct));
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    // Check whenever window resizes or children change
    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);
    for (const child of Array.from(el.children)) {
      ro.observe(child);
    }

    el.addEventListener('scroll', checkScroll, { passive: true });

    // Enable horizontal scrolling with vertical mouse wheel
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScroll =
          (e.deltaY > 0 && el.scrollLeft + el.clientWidth < el.scrollWidth - 1) ||
          (e.deltaY < 0 && el.scrollLeft > 1);
        if (canScroll) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.1;
          checkScroll();
        }
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', checkScroll);
      el.removeEventListener('wheel', onWheel);
    };
  }, [checkScroll]);

  const scrollBy = useCallback((distance: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  }, []);

  const scrollLeft = useCallback(() => scrollBy(-240), [scrollBy]);
  const scrollRight = useCallback(() => scrollBy(240), [scrollBy]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    hasDraggedRef.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const el = containerRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
      e.preventDefault();
      el.scrollLeft = startScrollLeftRef.current - walk;
    }
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  }, []);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollProgress,
    isDragging,
    scrollLeft,
    scrollRight,
    checkScroll,
    dragProps: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUpOrLeave,
      onMouseLeave: handleMouseUpOrLeave,
      onClickCapture: handleClickCapture
    }
  };
}

