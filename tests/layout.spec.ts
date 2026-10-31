import { expect, test } from '@playwright/test';

const widths = [320, 360, 375, 390, 480, 767, 768, 769, 1023, 1024, 1280, 1440, 1920];

for (const width of widths) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('mobile navigation opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Открыть меню' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible();
  await page.getByRole('link', { name: 'FAQ', exact: true }).first().click();
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeHidden();
});

test('quiz, FAQ and contact controls work', async ({ page }) => {
  await page.goto('/');
  const quiz = page.locator('#quiz');
  const contact = page.locator('#contact');

  await quiz.getByLabel('Есть только идея', { exact: true }).check();
  await expect(quiz.getByRole('button', { name: 'Далее' })).toBeEnabled();
  await quiz.getByRole('button', { name: 'Далее' }).click();
  await expect(
    quiz.getByRole('heading', { name: 'Вы уже участвовали в грантовых конкурсах?' })
  ).toBeVisible();
  await quiz.getByLabel('Нет, готовлюсь впервые', { exact: true }).check();
  await quiz.getByRole('button', { name: 'Далее' }).click();
  await expect(quiz.getByRole('heading', { name: 'Как с вами связаться?' })).toBeVisible();
  await quiz.getByLabel('Имя', { exact: true }).fill('Иван');
  await quiz.getByLabel('Телефон', { exact: true }).fill('+7 900 000-00-00');
  await quiz.getByLabel('Способ связи', { exact: true }).fill('Telegram');
  await quiz.getByRole('button', { name: 'Отправить', exact: true }).click();
  await expect(quiz.getByRole('button', { name: 'Спасибо! Мы свяжемся с вами' })).toBeVisible();
  await page.getByRole('button', { name: 'Вы полностью готовите заявку?' }).click();
  await expect(
    page.getByText('Да. Разбираем проект, формируем структуру', { exact: false })
  ).toBeVisible();
  await contact.getByLabel('Имя', { exact: true }).fill('Иван');
  await contact.getByLabel('Телефон', { exact: true }).fill('+7 900 000-00-00');
  await contact.getByRole('button', { name: 'Получить консультацию' }).click();
  await expect(contact.getByRole('button', { name: 'Заявка отправлена' })).toBeVisible();
});

test('project slider rotates cards with arrows', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('/');
  const titles = page.locator('.project h3');

  await expect(titles).toHaveText([
    'ИИ для подсчёта клеток',
    '«Фитобокс»',
    '«Автоматический фотограф»',
  ]);
  await page.getByRole('button', { name: 'Следующий проект' }).click();
  await expect(titles).toHaveText([
    '«Фитобокс»',
    '«Автоматический фотограф»',
    'ИИ для подсчёта клеток',
  ]);
  await page.getByRole('button', { name: 'Предыдущий проект' }).click();
  await expect(titles).toHaveText([
    'ИИ для подсчёта клеток',
    '«Фитобокс»',
    '«Автоматический фотограф»',
  ]);
});
