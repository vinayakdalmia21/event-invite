/**
 * Section 9: RSVP Experience
 * Inline detailed form + lotus confirmation animation
 */

import { gsap } from 'gsap';

export function initRsvp() {
  const form = document.getElementById('rsvp-form');
  const confirmation = document.getElementById('rsvp-confirmation');
  const headerArea = document.querySelector('.rsvp__header-area');

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log('RSVP Submitted:', data);

      // Animate out form and header, animate in confirmation
      const elementsToHide = [form];
      if (headerArea) elementsToHide.push(headerArea);

      gsap.to(elementsToHide, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          elementsToHide.forEach(el => el.style.display = 'none');
          if (confirmation) {
            confirmation.style.display = '';
            animateConfirmation();
          }
        }
      });
    });
  }

  function animateConfirmation() {
    const lotusEl = confirmation.querySelector('.rsvp-confirmation__lotus');
    const textEl = confirmation.querySelector('.rsvp-confirmation__text');
    const lotusPaths = lotusEl?.querySelectorAll('path');
    const lotusCircle = lotusEl?.querySelector('circle');

    const tl = gsap.timeline();

    // Set initial states
    gsap.set([lotusEl, textEl], { opacity: 0 });
    if (lotusPaths) gsap.set(lotusPaths, { opacity: 0, scale: 0.3, transformOrigin: 'center' });
    if (lotusCircle) gsap.set(lotusCircle, { opacity: 0, scale: 0 });

    // Animate lotus bloom
    tl.to(lotusEl, { opacity: 1, duration: 0.3 });

    if (lotusCircle) {
      tl.to(lotusCircle, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (lotusPaths) {
      tl.to(lotusPaths, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.12,
      }, '-=0.3');
    }

    gsap.set(textEl, { y: 15 });
    tl.to(textEl, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3');

    // Haptic
    if (navigator.vibrate) {
      navigator.vibrate([10]);
    }
  }
}
