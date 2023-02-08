const { getMetadata, compositeImages } = require('./services/Composite')


let imgArray = ['input/background.png', 'input/image1.png'];


compositeImages(imgArray, 'out/testOut')

