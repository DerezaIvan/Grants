<script lang="ts">
  import Button from '@/presentation/components/ui/Button/Button.svelte';
</script>

<style lang="scss">
  @use './Referral.scss';
</style>

<section class="referral">
  <div class="container">
    <div class="referral__card">
      <div>
        <h2 class="referral__title">
          Знаете студента, которому может подойти «Студенческий стартап»?
        </h2>
        <p class="referral__lead">
          Порекомендуйте нас и получите вознаграждение,<br />если участник приходит по вашей
          рекомендации<br />и начинает работать с нами.
        </p>
        <Button href="#contact" variant="lime">Рекомендовать студента</Button><strong
          class="referral__reward">10 000 рублей</strong
        >
      </div>
      <div class="referral__steps">
        <h3 class="referral__steps-title">Как это работает</h3>
        <p class="referral__step">
          <b class="referral__step-title">01. Рекомендуете участника</b><br />Передаёте контакт или
          отправляете ему свою реферальную ссылку.
        </p>
        <p class="referral__step">
          <b class="referral__step-title">02. Мы разбираем проект</b><br />Проводим предварительную
          оценку и понимаем, подходит ли проект для конкурса.
        </p>
        <p class="referral__step">
          <b class="referral__step-title">03. Получаете вознаграждение</b><br />За каждого
          приведённого друга, который станет победителем студенческого стартапа, вы получите 10 000
          ₽
        </p>
      </div>
    </div>
  </div>
</section>
