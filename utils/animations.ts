import gsap from "gsap";

/**
 * View Transition Animation
 * Slides the current page out to the top and fades it.
 * Used for page transitions.
 */
export function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.2,
        transform: "translateY(-35%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}


/**
 * Creates a shimmer effect animation tween.
 * Animates the shimmer element from left to right across the container.
 * @param target The element to animate
 * @returns GSAP Tween
 */
export const animateShimmer = (target: string | Element) => {
  // We use fromTo to ensure a clean state
  // xPercent is relative to the element's width, but we want to move relative to the PARENT's width.
  // Since the shimmer is absolutely positioned, 'left' works well.
  // We match the CSS logic: start at -100% (left) and move to 200% (right)
  return gsap.fromTo(
    target,
    { left: "-100%", transition: "none" }, 
    { 
      left: "200%", 
      duration: 1.5, 
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(target, { clearProps: "left" });
        gsap.delayedCall(0.1, () => {
          gsap.set(target, { clearProps: "transition" });
        });
      }
    }
  );
};


/**
 * Fades in an element from the bottom.
 * @param target The element to animate
 * @param vars Additional GSAP vars (delay, duration, etc.)
 * @returns GSAP Tween
 */
export const fadeInUp = (target: string | Element, vars?: gsap.TweenVars) => {
  return gsap.from(target, {
    y: 100,
    autoAlpha: 0,
    duration: 1,
    ease: "power2.out",
    ...vars,
  });
};


/**
 * Slides an element in from the top.
 * @param target The element to animate
 * @param vars Additional GSAP vars
 * @returns GSAP Tween
 */
export const slideInDown = (target: string | Element, vars?: gsap.TweenVars) => {
  return gsap.fromTo(
    target,
    { y: -200 },
    { y: 0, duration: 1, ease: "power4.out", ...vars }
  );
};
