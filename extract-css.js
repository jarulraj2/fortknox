const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const selector = process.argv[3];
  const sectionId = process.argv[4];

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.coverage.startCSSCoverage();
  await page.goto(url, { timeout: 60000 });
  await page.waitForSelector(selector, { timeout: 15000 });
  await page.waitForTimeout(3000);

  const element = await page.$(selector);
  if (!element) {
    console.error("❌ Selector not found:", selector);
    process.exit(1);
  }

  const html = await element.evaluate(el => el.outerHTML);
  const coverage = await page.coverage.stopCSSCoverage();

  let usedCSS = '';
  for (const entry of coverage) {
    for (const range of entry.ranges) {
      usedCSS += entry.text.slice(range.start, range.end) + '\n';
    }
  }

  const outputDir = `section_output/${sectionId}`;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(`${outputDir}/section.html`, html);
  fs.writeFileSync(`${outputDir}/used.css`, usedCSS);

  await browser.close();
})();
