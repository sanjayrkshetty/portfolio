"use client";
import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(".section");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Stagger children with reveal class
            const children = entry.target.querySelectorAll<HTMLElement>(".reveal");
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
