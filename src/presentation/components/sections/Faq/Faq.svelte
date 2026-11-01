<script lang="ts">
  import Accordion from '@/presentation/components/ui/Accordion/Accordion.svelte';
  import { faqItems } from './constants';

  let activeIndex: number | null = $state(0);
</script>

<style lang="scss">
  @use './Faq.scss';
</style>

<section id="faq" class="section faq">
  <div class="container faq__grid" data-anim-stagger data-anim-type="fade-right">
    <div class="faq__aside">
      <span class="faq__label">FAQ</span>
      <h2 class="section-title">Что важно знать,<br /> подаваясь на грант</h2>
    </div>
    <div class="faq__list" data-anim="fade-left">
      {#each faqItems as item, index}<Accordion
          question={item.question}
          answer={item.answer}
          open={activeIndex === index}
          onToggle={() => (activeIndex = activeIndex === index ? null : index)}
        />{/each}
    </div>
  </div>
</section>
