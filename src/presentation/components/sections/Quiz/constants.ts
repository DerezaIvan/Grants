export interface QuizOption {
  value: string;
}

export const stageOptions: QuizOption[] = [
  { value: 'Есть только идея' },
  { value: 'Есть диплом, исследование или разработка' },
  { value: 'Есть прототип' },
  { value: 'Есть работающий проект' },
];

export const participationOptions: QuizOption[] = [
  { value: 'Нет, готовлюсь впервые' },
  { value: 'Да, хочу учесть ошибки' },
  { value: 'Да, хочу улучшить результаты' },
  { value: 'Свой вариант' },
];
