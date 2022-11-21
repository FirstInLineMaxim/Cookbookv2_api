const fs = require('fs');


const fetchimage = () => {
fs.readFile('./content.json',(err,data) => {
let fetch = JSON.parse(data)
let urls = fetch.map(url => url.mainImage.file.url )
console.log(urls);
} )

}
fetchimage()
