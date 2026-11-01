<script lang="ts">
  import { asset } from '$app/paths';
  import { onMount } from 'svelte';
  import { projects } from './constants';

  let viewport: HTMLElement | undefined = $state();
  let canPrev = $state(false);
  let canNext = $state(true);

  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let dragMoved = false;

  const GAP = 20;

  function cardStep(): number {
    const card = viewport?.querySelector('.project');
    return card ? (card as HTMLElement).offsetWidth + GAP : 0;
  }

  function updateArrows() {
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    canPrev = viewport.scrollLeft > 2;
    canNext = viewport.scrollLeft < maxScroll - 2;
  }

  function scrollByCards(direction: number) {
    const step = cardStep();
    if (viewport && step > 0) {
      viewport.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  }

  function suppressClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  function onPointerDown(event: PointerEvent) {
    if (!viewport || event.pointerType === 'touch' || event.button !== 0) return;
    dragging = true;
    dragMoved = false;
    dragStartX = event.clientX;
    dragStartScroll = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || !viewport) return;
    const deltaX = event.clientX - dragStartX;
    if (Math.abs(deltaX) > 4) dragMoved = true;
    viewport.scrollLeft = dragStartScroll - deltaX;
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging || !viewport) return;
    dragging = false;
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    const step = cardStep();
    if (step > 0) {
      viewport.scrollTo({
        left: Math.round(viewport.scrollLeft / step) * step,
        behavior: 'smooth',
      });
    }
    if (dragMoved) {
      viewport.addEventListener('click', suppressClick, { capture: true, once: true });
    }
  }

  onMount(() => {
    if (!viewport) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(viewport);
    return () => observer.disconnect();
  });
</script>

<style lang="scss">
  @use './Projects.scss';
</style>

<section id="projects" class="section projects" aria-roledescription="Карусель">
  <div class="container">
    <h2 class="section-title section-title--center">
      Проекты, с которыми <span class="projects__title-break">мы уже прошли этот путь</span>
    </h2>
    <div class="projects__carousel" data-anim="fade-scale">
      <div
        class="projects__viewport"
        role="region"
        aria-label="Проекты"
        bind:this={viewport}
        onscroll={updateArrows}
        onpointerdown={onPointerDown}
        onpointermove={onPointerMove}
        onpointerup={onPointerUp}
        onpointercancel={onPointerUp}
      >
        <div class="projects__track">
          {#each projects as project (project)}
            <article class="project">
              <h3 class="project__title">{project.title}</h3>
              <p class="project__text">{project.text}</p>
              <p class="project__result">{project.result}</p>
              <a class="text-link project__link" href="#contact">Полный отзыв</a>
            </article>
          {/each}
        </div>
      </div>
      <div class="projects__controls" aria-label="Переключение проектов">
        <button
          class="projects__arrow"
          type="button"
          aria-label="Предыдущий проект"
          disabled={!canPrev}
          onclick={() => scrollByCards(-1)}
        >
          <img
            class="projects__arrow-icon"
            src={asset('/icons/arrow-left.svg')}
            alt=""
            width="24"
            height="24"
          />
        </button>
        <button
          class="projects__arrow"
          type="button"
          aria-label="Следующий проект"
          disabled={!canNext}
          onclick={() => scrollByCards(1)}
        >
          <img
            class="projects__arrow-icon"
            src={asset('/icons/arrow-right.svg')}
            alt=""
            width="24"
            height="24"
          />
        </button>
      </div>
    </div>
  </div>
</section>
