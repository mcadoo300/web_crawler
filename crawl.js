const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function normalizeURL(URL) {
  try {
    const host = URL.host
    const port = URL.port
    const path = URL.pathname
    const url_comp = [host,port,path]
    return url_comp.join('')

  } catch (error) {
    console.log(`error with normalizing url: ${error.message}`) 
  }
}

function getURLFromHTML(htmlBody, baseURL) {
  const linked_URLS = [];
  const dom = new JSDOM(htmlBody);
  const hyper_links = dom.window.document.querySelectorAll('a');
  for (const linkElement of hyper_links){
    if (linkElement.href.slice(0,1) === '/'){
      //relative
      try {
        const newURL = new URL(`${baseURL.origin}${linkElement.href}`);
        linked_URLS.push(newURL);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      try {
        const newURL = new URL(linkElement.href);
        linked_URLS.push(newURL);
      } catch (error) {
       console.log(`error with absolute url: ${error.message}`); 
      }
    }
  }
  return linked_URLS;
}

const html_text = '<html>' +
    '<body>' + 
        '<a href="/boot.dev/"><span>Go to Boot.dev</span></a>' +
    '</body>' +
'</html>';

getURLFromHTML(html_text, new URL("https://testme.com"));

module.exports = {
  normalizeURL
}
