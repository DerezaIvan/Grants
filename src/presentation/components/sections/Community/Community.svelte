<script lang="ts">
  import { asset } from '$app/paths';
</script>

<style lang="scss">
  @use './Community.scss';
</style>

<section id="community" class="section community">
  <div class="container">
    <h2 class="section-title section-title--center">
      Не только сопровождение:<br class="community__title-divider" /> присоединяйтесь
      <span class="community__title-break">к сообществу</span>
    </h2>
    <div class="community__grid" data-anim-stagger data-anim-type="fade-scale">
      <article class="community__card">
        <div class="community__icon" aria-hidden="true">
          <img src={asset('/icons/telegram.svg')} alt="" width="49" height="41" />
        </div>
        <h3 class="community__title">Telegram-канал</h3>
        <p class="community__text">
          Новости конкурса, материалы по подготовке, разборы и полезная информация для тех, кто
          готовится к подаче или уже развивает проект.
        </p>
        <a class="community__link text-link" href="https://t.me/stud_startup">Перейти на канал</a>
      </article>
      <article class="community__card">
        <div class="community__icon" aria-hidden="true">
          <img src={asset('/icons/chat.svg')} alt="" width="48" height="48" />
        </div>
        <h3 class="community__title">Чат участников</h3>
        <p class="community__text">
          Можно задать вопрос, обсудить проект и пообщаться с теми, кто уже проходил конкурс или
          готовится к нему сейчас.
        </p>
        <a class="community__link text-link" href="https://t.me/stud_startup">Перейти в чат</a>
      </article>
    </div>
  </div>
</section>
