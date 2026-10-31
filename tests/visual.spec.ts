import { expect, test } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

async function compareWithFigma(
  page: import('@playwright/test').Page,
  testInfo: import('@playwright/test').TestInfo,
  width: number,
  referencePath: string,
  maxDifferenceRatio: number,
  maxHeightDifference = 12
) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map(image =>
        image.complete
          ? Promise.resolve()
          : new Promise(resolve => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            })
      )
    );
  });

  const actualBuffer = await page.screenshot({ fullPage: true });
  const actual = PNG.sync.read(actualBuffer);
  const reference = PNG.sync.read(readFileSync(path.resolve(referencePath)));
  const height = Math.max(reference.height, actual.height);
  const paddedActual = new PNG({ width, height });
  const paddedReference = new PNG({ width, height });
  PNG.bitblt(actual, paddedActual, 0, 0, actual.width, actual.height, 0, 0);
  PNG.bitblt(reference, paddedReference, 0, 0, reference.width, reference.height, 0, 0);
  const diff = new PNG({ width, height });
  const differentPixels = pixelmatch(
    paddedReference.data,
    paddedActual.data,
    diff.data,
    width,
    height,
    { threshold: 0.12, includeAA: false, diffMask: true }
  );

  writeFileSync(testInfo.outputPath('actual.png'), actualBuffer);
  await testInfo.attach('reference', {
    body: readFileSync(path.resolve(referencePath)),
    contentType: 'image/png',
  });
  await testInfo.attach('diff', { body: PNG.sync.write(diff), contentType: 'image/png' });
  const differenceRatio = differentPixels / (width * height);
  testInfo.annotations.push(
    { type: 'page-height', description: `Figma ${reference.height}px; actual ${actual.height}px` },
    { type: 'pixel-difference', description: `${(differenceRatio * 100).toFixed(2)}%` }
  );

  expect(Math.abs(actual.height - reference.height)).toBeLessThanOrEqual(maxHeightDifference);
  expect(differenceRatio).toBeLessThanOrEqual(maxDifferenceRatio);
}

test('desktop matches Figma within the approved tolerance', async ({ page }, testInfo) => {
  await compareWithFigma(page, testInfo, 1440, 'tests/figma/grants-desktop-1440.png', 0.08);
});

test('tablet matches Figma within the approved tolerance', async ({ page }, testInfo) => {
  await compareWithFigma(page, testInfo, 1024, 'tests/figma/grants-tablet-1024.png', 0.12, 200);
});

test('mobile matches Figma within the approved tolerance', async ({ page }, testInfo) => {
  await compareWithFigma(page, testInfo, 375, 'tests/figma/grants-mobile-375.png', 0.12);
});
