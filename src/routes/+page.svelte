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
</script>

<svelte:head>
  <title>Искра — сопровождение грантовых проектов</title>
  <meta
    name="description"
    content="Помогаем подготовить идею или проект к «Студенческому стартапу» и другим грантовым конкурсам: от анализа до защиты заявки."
  />
  <meta property="og:title" content="Искра — из идеи в грантовый проект" />
  <meta
    property="og:description"
    content="Бесплатно оценим проект и поможем подготовиться к грантовому конкурсу."
  />
  <meta property="og:type" content="website" />
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
