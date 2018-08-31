// example script for downloading all images in a timeseries

const fs = require('fs')
const fetch = require('node-fetch')

const lng = 17.30
const lat = 40.75
const outputFolder = './downloaded'

const baseUrl = 'https://mtf-sat.synvinkel.org'
const API_KEY = process.env.API_KEY

const downloadAllImages = async (lat, lng) => {
    const result = await (await fetch(`${baseUrl}/timeseries/stockholm?apikey=${API_KEY}&buffer=100`)).json()

    result.images.forEach((image, i) => downloadImage(image.url, i))
}

const downloadImage = async (url, i) => {
    console.log(i, 'starting download')
    const filename = url.split('/').slice(-1)[0]
    const image = await fetch(url)
    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(`${outputFolder}/${filename}`)
        image.body.pipe(fileStream)
        image.body.on('error', (err) => {
            reject(err)
        })
        fileStream.on('finish', () => resolve())
    })
    console.log(i, 'image downloaded')
}

downloadAllImages(lat, lng)
