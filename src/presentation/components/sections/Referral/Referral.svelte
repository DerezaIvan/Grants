<script lang="ts">
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import ReferralModal from '@/presentation/components/ui/ReferralModal/ReferralModal.svelte';
  import { steps } from './constants';

  let referralOpen = $state(false);
</script>

<style lang="scss">
  @use './Referral.scss';
</style>

<section class="referral">
  <div class="container">
    <div class="referral__card" data-anim="fade-scale">
      <div class="referral__content">
        <h2 class="referral__title">
          <span class="referral__title-desktop"
            >Знаете студента, которому<br />может подойти<br />«Студенческий стартап»?</span
          >
          <span class="referral__title-mobile"
            >Знаете студента,<br />которому может<br />подойти «Студенческий<br />стартап»?</span
          >
        </h2>
        <p class="referral__lead">
          <span class="referral__lead-desktop"
            >Порекомендуйте нас и получите вознаграждение,<br />если участник приходит по вашей
            рекомендации<br />и начинает работать с нами.</span
          >
          <span class="referral__lead-mobile"
            >Порекомендуйте нас и получите<br />вознаграждение, если участник<br />приходит по вашей
            рекомендации<br />и начинает работать с нами.</span
          >
        </p>
        <div class="referral__action">
          <Button type="button" variant="lime" onclick={() => (referralOpen = true)}
            >Рекомендовать студента</Button
          >
        </div>
        <p class="referral__reward">10 000 рублей</p>
      </div>
      <div class="referral__steps">
        <h3 class="referral__steps-title">Как это работает</h3>
        {#each steps as step}
          <div class="referral__step">
            <p class="referral__step-title">{step.title}</p>
            <p class="referral__step-text">{step.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<ReferralModal bind:open={referralOpen} />
