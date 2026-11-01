<script lang="ts">
  import Hero from '@/presentation/components/sections/Hero/Hero.svelte';
  import About from '@/presentation/components/sections/About/About.svelte';
  import Start from '@/presentation/components/sections/Start/Start.svelte';
  import Quiz from '@/presentation/components/sections/Quiz/Quiz.svelte';
  import Result from '@/presentation/components/sections/Result/Result.svelte';
  import Experts from '@/presentation/components/sections/Experts/Experts.svelte';
  import Projects from '@/presentation/components/sections/Projects/Projects.svelte';
  import Referral from '@/presentation/components/sections/Referral/Referral.svelte';
  import Community from '@/presentation/components/sections/Community/Community.svelte';
  import Faq from '@/presentation/components/sections/Faq/Faq.svelte';
  import Contact from '@/presentation/components/sections/Contact/Contact.svelte';
  import Footer from '@/presentation/layout/Footer/Footer.svelte';
  import { faqItems } from '@/presentation/components/sections/Faq/constants';

  const siteUrl = 'https://studstartup.ru';

  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Искра',
        url: siteUrl,
        logo: `${siteUrl}/icons/logo.svg`,
        description:
          'Сопровождение студенческих стартапов на грантовых конкурсах: «Студенческий стартап», ФСИ, Сколково.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+7 920 291-21-77',
          contactType: 'sales',
          areaServed: 'RU',
          availableLanguage: ['Russian'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Искра — студенческие стартапы',
        inLanguage: 'ru-RU',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        name: 'Сопровождение заявки на грант «Студенческий стартап»',
        serviceType: 'Консалтинг по грантам',
        areaServed: 'RU',
        provider: { '@id': `${siteUrl}/#organization` },
        description:
          'Бесплатная оценка проекта, подготовка заявки, документов и защиты. Оплата 3–6% от гранта только после победы.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'RUB',
          description: 'Бесплатная оценка проекта перед подачей заявки',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/\n/g, ' ') },
        })),
      },
    ],
  })}<\/script>`;
</script>

<svelte:head>
  <title>Студенческий стартап — грант до 1 млн ₽ для студенческого проекта | Искра</title>
  <meta
    name="description"
    content="Помогаем студенческим стартапам получить грант «Студенческий стартап» до 1 млн ₽: бесплатно оценим проект, подготовим заявку и защиту. Оплата за результат — после победы."
  />
  <meta
    name="keywords"
    content="студенческий стартап, грант студенческий стартап, грант для студентов, грант на проект, ФСИ грант, грантовый конкурс, сопровождение заявки, субсидии стартапам, Сколково грант"
  />
  <meta name="author" content="Искра" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="https://studstartup.ru/" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Искра — студенческие стартапы" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:url" content="https://studstartup.ru/" />
  <meta property="og:title" content="Студенческий стартап — грант до 1 млн ₽ для вашего проекта" />
  <meta
    property="og:description"
    content="Бесплатно оценим проект и поможем победить в «Студенческом стартапе»: заявка, документы, защита. Платите только за результат."
  />
  <meta property="og:image" content="https://studstartup.ru/images/og-cover.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Искра — из идеи в грантовый проект" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Студенческий стартап — грант до 1 млн ₽ для вашего проекта" />
  <meta
    name="twitter:description"
    content="Бесплатно оценим проект и поможем победить в «Студенческом стартапе»: заявка, документы, защита."
  />
  <meta name="twitter:image" content="https://studstartup.ru/images/og-cover.jpg" />

  {@html jsonLd}
</svelte:head>

<main>
  <Hero />
  <About />
  <Start />
  <Quiz />
  <Result />
  <Experts />
  <Projects />
  <Referral />
  <Community />
  <Faq />
  <Contact />
</main>
<Footer />
