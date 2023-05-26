const fs = require('fs')

// reading files
// fs.readFile('./docs/doc.txt', (err, data) => {
//     if (err) {console.log(err)}
//     console.log(data.toString())
// })

// console.log('last line')

// writing files
//  fs.writeFile('./docs/doc.txt', 'Haya bravo!', () => {
//     console.log('file written')
//  })

//  fs.writeFile('./docs/doc-new.txt', 'Bravo bravo!', () => {
//     console.log('file written')
//  })

// directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err)=> {console.log('done')})
} else {
    fs.rmdir('./assets', (err) => {
        if(err) {
            console.log(err)
        }
        console.log('dleted')
    })
}


//delete files
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err) {
            console.log(err)
        }
        console.log('file dleted')
    })
}