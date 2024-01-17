const { test, expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl.js')


test('strip https://boot.dev/ to boot.dev', () => {
  expect(normalizeURL("https://boot.dev/")).toBe("boot.dev");
});
