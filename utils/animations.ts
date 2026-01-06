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

/**
 * Creates a modular handwriting animation for an icon.
 * @param target The element to animate (e.g., the hand icon)
 * @param width The total width covered by the writing motion
 * @param steps The number of strokes/steps in the writing phase
 * @param duration Total duration of one full cycle (write + return)
 * @returns GSAP Timeline
 */
export function animateHandWriting(
  target: gsap.TweenTarget,
  width: number,
  steps: number,
  duration: number = 2
) {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });
  const stepSize = width / steps;
  const startX = -width / 2;

  // Initial state
  tl.set(target, { x: startX, y: 0, rotation: 0 });

  // Writing phase (approx 80% of duration)
  const writeDuration = (duration * 0.8) / steps;

  for (let i = 1; i <= steps; i++) {
    const isOdd = i % 2 !== 0;
    const x = startX + (i * stepSize);
    // "writing height change should be abwechselnd -step_size/2 and step_size/2"
    const y = isOdd ? stepSize / 2 : -stepSize / 2;
    const rotation = isOdd ? -5 : 0;

    tl.to(target, {
      x: x,
      y: y,
      rotation: rotation,
      duration: writeDuration,
    });
  }

  // Return phase (approx 20% of duration)
  // "return height should be step_size*2" (Arc upwards)
  const returnDuration = duration * 0.2;
  
  tl.to(target, {
    x: startX,
    y: -stepSize * 2, // Arc up
    rotation: -10,
    duration: returnDuration * 0.5, // Halfway back
    ease: "power1.out"
  })
  .to(target, {
    x: startX,
    y: 0,
    rotation: 0,
    duration: returnDuration * 0.5, // Land
    ease: "power1.in"
  });

  return tl;
}

/**
 * Waving Hand Animation
 * Rotates the target element back and forth to simulate a waving motion.
 * Waves exactly 2 times.
 * @param target The element to animate
 * @param delay Optional delay before starting the animation (in seconds)
 */
export const animateWave = (target: gsap.TweenTarget, delay: number = 0) => {
    const tl = gsap.timeline({ delay: delay });
    
    tl.to(target, { rotation: 25, duration: 0.15, ease: "power1.out" })
      .to(target, { rotation: -10, duration: 0.15, ease: "power1.inOut" })
      .to(target, { rotation: 25, duration: 0.15, ease: "power1.inOut" })
      .to(target, { rotation: -10, duration: 0.15, ease: "power1.inOut" })
      .to(target, { rotation: 0, duration: 0.25, ease: "back.out(1.7)" });
      
    return tl;
};

