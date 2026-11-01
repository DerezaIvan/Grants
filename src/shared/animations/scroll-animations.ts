let observer: IntersectionObserver | null = null;
let active = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function applyStaggerDelays(): void {
  const groups = document.querySelectorAll<HTMLElement>('[data-anim-stagger]');

  for (const group of groups) {
    const animation = group.getAttribute('data-anim-type') ?? 'fade-up';

    Array.from(group.children).forEach((child, index) => {
      const element = child as HTMLElement;
      if (!element.hasAttribute('data-anim')) {
        element.setAttribute('data-anim', animation);
      }
      element.setAttribute('data-anim-delay', String(index + 1));
    });
  }
}

function observeElements(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-anim]');

  if (prefersReducedMotion()) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      }
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' },
  );

  elements.forEach(element => observer?.observe(element));
}

export function initScrollAnimations(): void {
  if (active) return;
  active = true;
  applyStaggerDelays();
  observeElements();
}

export function destroyScrollAnimations(): void {
  if (!active) return;
  active = false;
  observer?.disconnect();
  observer = null;
  document.querySelectorAll<HTMLElement>('[data-anim]').forEach(element => {
    element.classList.remove('is-visible');
  });
}
