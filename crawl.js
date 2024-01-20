const { JSDOM } = require('jsdom');
const { env } = require('node:process');

function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}

function normalizeURL(url){
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

async function crawlPage(startURL, currentURL, pages){
  const currentURLObj = new URL(currentURL);
  const startURLObj = new URL(startURL);

  if (startURLObj.hostname !== currentURLObj.hostname){
    return pages;
  }
  
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0){
    pages[normalizedCurrentURL]++;
    return pages;
  }
  
  if (currentURL === startURL){
    pages[normalizedCurrentURL] = 0;
  }else{
    pages[normalizedCurrentURL] = 1;
  }

  console.log(`crawling ${currentURL}`);
  let htmlBody = '';
  try {
      const response = await fetch(currentURL);
    if (response.status >= 400){
      console.log('Error with status')
      exit();
    } else if (response.type === 'text/html'){
      console.log('Error with type')
      exit();
    } else{
      htmlBody = await response.text();
    }
  } catch (error) {
   console.log(`Error in trying to crawl URL:\n ${error.message}`) 
  }
  
  const nextURLs = getURLsFromHTML(htmlBody, startURL);
  for (const nextURL of nextURLs){
    pages = await crawlPage(startURL, nextURL, pages);
  }
  return pages;
}




module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}
