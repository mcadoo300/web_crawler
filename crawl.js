function normalizeURL(URL) {
  const host = URL.host
  const port = URL.port
  const path = URL.pathname
  const url_comp = [host,port,path]
  console.log(URL);
  return url_comp.join('')
}

normalizeURL(new URL("https://www.demo-site.org/products/item?id=12345"));


module.exports = {
  normalizeURL
}
