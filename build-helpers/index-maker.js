const fs = require('fs');
const path = require('path');

const indexPath = path.resolve('../dist/index.html');

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(`<script id="ga-analitics">`, `<script>(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-86826463-1','auto');ga('send','pageview');`);

  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
  });
});
