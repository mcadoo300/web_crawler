const { crawlPage } = require('./crawl.js')

async function main(){
  if (process.argv.length < 3){
    console.log('no website URL provided')
  } else if (process.argv.length > 3){
    console.log('too many arguments passed')
  } else{
    const baseURL = process.argv[2];

    console.log(`starting to crawl from: ${baseURL}`);
    await crawlPage(baseURL,baseURL,[]);
  }
}

main();
