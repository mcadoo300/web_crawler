function printReport(pages){
  const pagesArr = Object.entries(pages)
  pagesArr.sort((pageA,pageB) => {
    return pageB[1] - pageA[1]
  })
  console.log(pagesArr);
  console.log('++++++++++')
  console.log('--REPORT--')
  console.log('++++++++++')
  for (const page of pagesArr){
    console.log("here");
    console.log(`Found ${page[1]} number of internal links to ${page[0]}`)
  }
}

module.exports = {
  printReport
}
