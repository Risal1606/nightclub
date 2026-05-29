// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [navTop, setNavTop] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const hero = document.querySelector(".hero") as HTMLElement | null;
    if (!hero) {
      setScrolled(true);
      return;
    }

    const update = () => {
      const heroRect = hero.getBoundingClientRect();
      const navHeight = navRef.current?.offsetHeight ?? 64;
      const vh = window.innerHeight;

      if (heroRect.bottom <= 0) {
        setScrolled(true);
        setNavTop(0);
      } else {
        setScrolled(false);
        setNavTop(Math.min(heroRect.bottom - navHeight, vh - navHeight));
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/book-table", label: "Book Table" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isHeroPosition = isHome && !scrolled;

  const positionStyle: React.CSSProperties =
    !isHome || scrolled
      ? { top: 0, bottom: "auto" }
      : navTop !== null
      ? { top: navTop, bottom: "auto" }
      : { bottom: 0, top: "auto" };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${isHeroPosition ? "navbar-hero" : "navbar-solid"}`}
        style={positionStyle}
      >
        <div className="navbar-inner">
          <Link
            href="/"
            className="navbar-logo"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <div className="logo-row">
              <span className="logo-night">NIGHT</span>
              <span className="logo-club">CLUB</span>
            </div>
            <span className="logo-tagline">HAVE A GOOD TIME</span>
          </Link>

          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`navbar-link ${pathname === link.href ? "active" : ""}`}
                  onClick={(e) => {
                    if (link.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.location.reload();
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="burger"
            popoverTarget="mobile-menu"
            aria-label="Åbn menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="navbar-deco-left" />
        <div className="navbar-deco-right" />
      </nav>

      <div id="mobile-menu" popover="auto" className="mobile-menu">
        <button
          popoverTarget="mobile-menu"
          popoverTargetAction="hide"
          className="mobile-menu-close"
          aria-label="Luk menu"
        >
          ✕
        </button>
        <ul className="mobile-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`mobile-link ${pathname === link.href ? "active" : ""}`}
                onClick={(e) => {
                  const menu = document.getElementById("mobile-menu") as HTMLElement & { hidePopover?: () => void };
                  menu?.hidePopover?.();
                  if (link.href === "/" && pathname === "/") {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}