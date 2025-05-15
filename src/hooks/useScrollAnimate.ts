
// src/hooks/useScrollAnimate.ts
"use client";
import { useEffect, RefObject } from 'react';

export const useScrollAnimate = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate-visible');
            // Optional: Unobserve after animation to save resources
            // observer.unobserve(entry.target);
          } else {
            // Optional: Remove class if you want animation to repeat on scroll out and back in
            // entry.target.classList.remove('scroll-animate-visible');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
};
