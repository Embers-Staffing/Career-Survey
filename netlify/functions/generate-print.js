const puppeteer = require('puppeteer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { content } = JSON.parse(event.body);
    
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
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=career-recommendations-print.pdf'
      },
      body: pdf.toString('base64'),
      isBase64Encoded: true
    };
    
  } catch (error) {
    console.error('Print generation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Print generation failed' })
    };
  }
}; 