const fs = require('fs').promises;

async function setGa() {
  const html = await fs.readFile('./dist/index.html', 'utf-8');
  const newHtml = html.replace('<!--GA-->', `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-86826463-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-86826463-1');
    </script>
  `);

  await fs.writeFile('./dist/index.html', newHtml);
}

setGa();
