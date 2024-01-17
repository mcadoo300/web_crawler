function normalizeURL(URL) {
  let dub_slash_position = URL.search("//");
  let skip = 2;
  if (URL.charAt(URL.length-1) == "/"){
    return URL.substring(dub_slash_position+skip,URL.length-1);
  } else {
    return URL.substring(dub_slash_position+skip);
  }
}


module.exports = {
  normalizeURL
  
}
