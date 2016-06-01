'use strict'

module.exports = (function () {
  const mongoose = require('mongoose')
  const Grid = require('gridfs-stream')
  const fs = require('fs')
  const concat = require('concat-stream')

  Grid.mongo = mongoose.mongo

  const writeToGridFS = (filename, pathToStore, root) => {
    let gfs = Grid(mongoose.connection.db)
    return new Promise((resolve, reject) => {
      let writeStream = gfs.createWriteStream({
        filename: filename,
        content_type: 'application/pdf',
        chunkSize: 2048,
        root: root
      })

      fs.createReadStream(pathToStore).pipe(writeStream)

      writeStream.on('error', (err) => reject(err))
      writeStream.on('finish', () => resolve())
    })
  }

  const readFromGridFS = (gridFSFilename, destPath, root) => {
    let gfs = Grid(mongoose.connection.db)
    return new Promise((resolve, reject) => {
      let readStream = gfs.createReadStream({
        filename: gridFSFilename,
        root: root
      })

      let writeStream = fs.createWriteStream(destPath)

      readStream.pipe(writeStream)

      writeStream.on('error', (err) => reject(err))
      writeStream.on('finish', () => resolve())
    })
  }

  const downloadFromGridFS = (gridFSFilename, root) => {
    let gfs = Grid(mongoose.connection.db)
    return new Promise((resolve, reject) => {
      let readStream = gfs.createReadStream({
        filename: gridFSFilename,
        root: root
      })

      readStream.pipe(concat((data) => resolve(data)))

      readStream.on('error', () => {
        // reject(err)
      })
      readStream.on('close', () => {
        // resolve()
      })
    })
  }

  const removeGridFSFile = (gridFSFilename, root) => {
    let gfs = Grid(mongoose.connection.db)
    return new Promise((resolve, reject) => {
      gfs.remove({
        filename: gridFSFilename,
        root: root
      }, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  const mod = {
    writeToGridFS: writeToGridFS,
    downloadFromGridFS: downloadFromGridFS,
    removeGridFSFile: removeGridFSFile,
    readFromGridFS: readFromGridFS
  }

  return mod
}())
