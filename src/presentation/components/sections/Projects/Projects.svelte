<script lang="ts">
  import { asset } from '$app/paths';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';
  import { projects } from './constants';

  let offset = $state(0);
  let orderedProjects = $derived([...projects.slice(offset), ...projects.slice(0, offset)]);

  function rotate(direction: number) {
    offset = (offset + direction + projects.length) % projects.length;
  }
</script>

<style lang="scss">
  @use './Projects.scss';
</style>

<section id="projects" class="section projects" aria-roledescription="Карусель">
  <div class="container">
    <h2 class="section-title section-title--center">Проекты, с которыми мы уже прошли этот путь</h2>
    <div class="projects__carousel">
      <div class="projects__viewport" role="region" aria-label="Проекты">
        <div class="projects__track">
          {#each orderedProjects as project (project.title)}
            <article class="project" animate:flip={{ duration: 320, easing: cubicOut }}>
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
          onclick={() => rotate(-1)}
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
          onclick={() => rotate(1)}
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
