var util = require('util')
var exec = util.promisify(require('child_process').exec)
const fs = require('fs')

export default class Metapixel {
  run(library, keyword, original, id) {
    return new Promise((resolve, reject) => {
      const source_folder = `${library}/${keyword}`

      // Count files in library
      fs.readdir(source_folder, (err, files) => {
        if (err){
          console.log(err)
        } else {
          console.log('########################################')
          console.log(`# Creating mozaic`)
          console.log('########################################')
          console.log(`# Number of files: ${files.length}`)

          if (files.length < 50) {
            console.log('Not enough files, need at least 50 files.')
            resolve()
          } else {
            this.mozaic(id, source_folder, 250, 250, original, 3)
              .then(() => {
                resolve()
              })
              .catch(err => {
                reject(err)
              })
          }
        }
      })
    })
  }

  async mozaic(id, source_folder, width, height, original, scale) {
    const output=`public/img/mozaic_${id}.png`

    console.log('\nPreparing miniatures')
    var { stdout, stderr } = await exec(`metapixel-prepare --recurse ${source_folder} src/metapixel/tmp_img --width=${width} --height=${height}`);
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)

    console.log('\nBuilding mozaic')
    var { stdout, stderr } = await exec(`metapixel --library src/metapixel/tmp_img --metapixel ${original} ${output} --scale=${scale}`);
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)

    console.log('\nCleaning miniatures')
    var { stdout, stderr } = await exec('/bin/rm -f src/metapixel/tmp_img/*');
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)

    console.log('\nRecreate .gitkeep')
    var { stdout, stderr } = await exec('/bin/touch src/metapixel/tmp_img/.gitkeep');
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  }
}





