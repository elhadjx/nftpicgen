const { getMetadata, compositeImages, resizeImage } = require('./services/Composite')
const CreationCounter = require('./utils/CreationCounter')


let imgArray = ['input/background.png', 'input/image1.png'];


//compositeImages(imgArray, 'out/testOut')


function generate() {

    let backs = ['b1', 'b2', 'b3']
    let middles = ['m1', 'm2', 'm3']
    let tops = ['t1', 't2', 't3']

    let layers = [backs, middles, tops]

    const max = backs.length * middles.length * tops.length;

    let counter = 0;
    let imageArray = [];
    let maxsArray = [];
    layers.forEach(layer => {
        maxsArray.push(layer.length - 1)
    });
    let cc = new CreationCounter(maxsArray)
    let result = []

    while (counter < max) {
        let toPush = ''
        for (let lyi = 0; lyi < layers.length; lyi++) {
            toPush += layers[lyi][cc.current[lyi]];
        }
        result.push(toPush)
        cc.increment()
        counter++
    }

    console.log(result)
}



function resize() {
    resizeImage('input/test/0.png', 500, 500)
}


resize()









