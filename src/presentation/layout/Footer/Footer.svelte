<script lang="ts">
  import { asset } from '$app/paths';
  import Logo from '@/presentation/components/ui/Logo/Logo.svelte';
</script>

<style lang="scss">
  @use './Footer.scss';
</style>

<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <Logo />
      <div class="footer__checklists">
        <a class="footer__checklist-link" href="#contact"
          >Получить чек-лист подготовки заявки на СтудСтартап</a
        ><a class="footer__checklist-link" href="#contact"
          >Получить чек-лист Актуальных грантовых конкурсов</a
        >
      </div>
      <address class="footer__contact">
        <b class="footer__name">Денис Балдов</b><br /><a
          class="footer__link"
          href="tel:+79023982941">+7 902 398-29-41</a
        ><br /><a class="footer__link" href="mailto:dab1999y@gmail.com">dab1999y@gmail.com</a>
      </address>
      <address class="footer__contact">
        <b class="footer__name">Егор Исаев</b><br /><a class="footer__link" href="tel:+79202912177"
          >+7 920 291-21-77</a
        ><br /><a class="footer__link" href="mailto:egor-andreich2013@mail.ru"
          >egor-andreich2013@mail.ru</a
        >
      </address>
    </div>
    <nav class="footer__nav" aria-label="Навигация в подвале">
      <a href="#quiz">Оценить проект</a>
      <div class="footer__nav-group">
        <a href="#about">Как работаем</a><a href="#projects">Кейсы</a>
      </div>
      <div class="footer__nav-group">
        <a href="#experts">Команда</a><a href="#community">Сообщество</a>
      </div>
      <div class="footer__nav-group"><a href="#faq">FAQ</a><a href="#contact">Контакты</a></div>
    </nav>
    <!-- <div class="footer__fund">
      <img
        class="footer__fund-logo"
        src={asset('/icons/fund.svg')}
        alt=""
        width="106"
        height="51"
      />

      <p class="footer__fund-text">
        Проект создан при поддержке Федерального государственного бюджетного учреждения «Фонд
        содействия развитию малых форм предприятий в научно-технической сфере в рамках программы
        «Студенческий стартап» федерального проекта «Платформа университетского технологического
        предпринимательства»
      </p>
    </div> -->
    <div class="footer__bottom">
      <span class="footer__copyright">© 2026 Искра</span>
      <div class="footer__legal">
        <a class="footer__bottom-link" href="#privacy">Политика конфиденциальности</a>
        <a class="footer__bottom-link" href="#privacy">Согласие на обработку персональных данных</a>
      </div>
    </div>
  </div>
</footer>
