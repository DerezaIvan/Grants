<script lang="ts">
  import Accordion from '@/presentation/components/ui/Accordion/Accordion.svelte';
  import { faqItems } from './constants';
</script>

<style lang="scss">
  @use './Faq.scss';
</style>

<section id="faq" class="section faq">
  <div class="container faq__grid">
    <div class="faq__aside">
      <span>FAQ</span>
      <h2 class="section-title">Что важно знать,<br />подаваясь на грант</h2>
    </div>
    <div>
      {#each faqItems as item, index}<Accordion
          question={item.question}
          answer={item.answer}
          open={index === 0}
        />{/each}
    </div>
  </div>
</section>
