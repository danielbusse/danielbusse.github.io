"use client";

import React, { useRef } from 'react';
import { useTransitionRouter } from 'next-view-transitions';
import styles from './Button.module.scss';
import { useGSAP } from '@gsap/react';
import { animateShimmer, slideInOut } from '@/utils/animations';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  shimmerId?: string;
  animateOnLoad?: boolean;
  delay?: number;
  useTransition?: boolean;
}

export default function Button({ 
  href, 
  children, 
  className, 
  shimmerId,
  animateOnLoad = false,
  delay = 0,
  useTransition = true,
  onClick,
  ...props 
}: ButtonProps) {
  const shimmerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const router = useTransitionRouter();

  useGSAP(() => {
    if (animateOnLoad && shimmerRef.current) {
      animateShimmer(shimmerRef.current).delay(delay);
    }
  }, [animateOnLoad, delay]);

  const isExternal = href.startsWith('http');
  const combinedClassName = `${styles.button} ${className || ''}`;

  const content = (
    <div>
      <div 
        className={styles.shimmer} 
        id={shimmerId} 
        ref={shimmerRef}
      ></div>
      {children}
    </div>
  );

  if (isExternal) {
    return (
      <a 
        href={href} 
        className={combinedClassName} 
        ref={buttonRef}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    );
  }
  // use the router to trigger the custom transition
  return (
    <a
      href={href}
      className={combinedClassName}
      ref={buttonRef}
      onClick={(e) => {
        if (useTransition) {
           e.preventDefault();
           router.push(href, {
             onTransitionReady: slideInOut,
           });
        }
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {content}
    </a>
  );
}
