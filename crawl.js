const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function normalizeURL(URL) {
  const host = URL.host
  const port = URL.port
  const path = URL.pathname
  const url_comp = [host,port,path]
  return url_comp.join('')
}

function getURLFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  console.log(dom.window.document.querySelector("a").href);
}

const html_text = '<html>' +
    '<body>' + 
        '<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>' +
    '</body>' +
'</html>';

getURLFromHTML(html_text, new URL("https://www.testme.com"));

module.exports = {
  normalizeURL
}
