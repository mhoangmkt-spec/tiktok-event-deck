/**
 * Export slides HTML → PNG
 * Yêu cầu: Node.js + Puppeteer
 *
 * Cài đặt (chạy 1 lần):
 *   npm install puppeteer
 *
 * Chạy:
 *   node export-slides.js
 *
 * Output: thư mục exports/ — 5 file PNG 3840x2160 (2x Retina)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_FILE = path.resolve(__dirname, 'slides-01-05.html');
const OUTPUT_DIR = path.resolve(__dirname, 'exports');

// Số lượng slide trong file
const SLIDE_COUNT = 7;

// Kích thước slide 16:9 @ 2x
const WIDTH  = 1920;
const HEIGHT = 1080;
const SCALE  = 2; // deviceScaleFactor → output thực tế 3840x2160

async function exportSlides() {
  // Tạo thư mục exports nếu chưa có
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🚀 Khởi động trình duyệt...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set viewport đúng tỉ lệ 16:9 với scale 2x
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: SCALE,
  });

  // Mở file HTML local
  const fileUrl = `file:///${HTML_FILE.replace(/\\/g, '/')}`;
  console.log(`📂 Mở file: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Chờ Google Fonts load xong
  await wait(2000);

  // Lấy danh sách tất cả .slide elements
  const slideElements = await page.$$('.slide');
  console.log(`📋 Tìm thấy ${slideElements.length} slides\n`);

  for (let i = 0; i < slideElements.length; i++) {
    const slideNum = String(i + 1).padStart(2, '0');
    const outputPath = path.join(OUTPUT_DIR, `slide-${slideNum}.png`);

    // Scroll slide vào vùng nhìn thấy
    await slideElements[i].scrollIntoView();
    await wait(200);

    // Chụp đúng element .slide (không chụp cả trang)
    await slideElements[i].screenshot({
      path: outputPath,
      type: 'png',
    });

    console.log(`✅ Slide ${slideNum} → exports/slide-${slideNum}.png`);
  }

  await browser.close();
  console.log(`\n🎉 Xong! ${slideElements.length} slides đã xuất vào thư mục exports/`);
}

exportSlides().catch(err => {
  console.error('❌ Lỗi:', err.message);
  process.exit(1);
});
