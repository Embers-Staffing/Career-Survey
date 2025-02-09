const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();

router.post('/generate-pdf', async (req, res) => {
  try {
    const { content } = req.body;
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    await browser.close();
    
    res.contentType('application/pdf');
    res.send(pdf);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'PDF generation failed' });
  }
});

// Add print endpoint
router.post('/generate-print', async (req, res) => {
  try {
    const { content } = req.body;
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();

    // Set print-specific styles
    const printStyles = `
      @page {
        size: A4;
        margin: 20mm;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `;

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${printStyles}</style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `, { waitUntil: 'networkidle0' });

    // Generate PDF optimized for printing
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%;">
          <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `
    });
    
    await browser.close();
    
    res.contentType('application/pdf');
    res.send(pdf);
    
  } catch (error) {
    console.error('Print generation error:', error);
    res.status(500).json({ error: 'Print generation failed' });
  }
});

module.exports = router; 