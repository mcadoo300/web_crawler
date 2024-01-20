const { test, expect} = require('@jest/globals')
const {normalizeURL, getURlFromHTML} = require('./crawl.js')


test('test URLnormalization function', () => {
  expect(normalizeURL(new URL("https://boot.dev/"))).toBe("boot.dev/");
  expect(normalizeURL(new URL("https://www.example.com/page1"))).toBe("www.example.com/page1");
  expect(normalizeURL(new URL("http://subdomain.example.org/page2?param1=value1&param2=value2"))).toBe("subdomain.example.org/page2");
  expect(normalizeURL(new URL("https://www.test-site.com/path/to/page3"))).toBe("www.test-site.com/path/to/page3");
  expect(normalizeURL(new URL("ftp://ftp.example.net/file.zip"))).toBe("ftp.example.net/file.zip");
  expect(normalizeURL(new URL("https://blog.example.org/category/javascript"))).toBe("blog.example.org/category/javascript");
  expect(normalizeURL(new URL("http://user:password@example.com/login"))).toBe("example.com/login");
  expect(normalizeURL(new URL("https://www.demo-site.org/products/item?id=12345"))).toBe("www.demo-site.org/products/item");
  expect(normalizeURL(new URL("https://api.example.io/v1/data?query=test"))).toBe("api.example.io/v1/data");
  expect(normalizeURL(new URL("https://www.sample-page.com/index.html#section1"))).toBe("www.sample-page.com/index.html");
  expect(normalizeURL(new URL("ws://websocket.example.net/socket"))).toBe("websocket.example.net/socket");
  


});

test('test for getURlFromHTML function', () => {
  const inputHTML = '<a href="https://blog.boot.dev"> boot.dev blog </a>';
  const inputURL = new URL("https://test.com");
  const expected = ['https://blog.boot.dev'];
  expect(getURlFromHTML(inputHTML,inputURL)).toEqual(expected);
});
