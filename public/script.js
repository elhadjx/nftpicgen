const myToken = generateToken();
document.getElementById('token').value = myToken;

document.getElementById("uploadForm").style.display = "none";
document.getElementsByClassName("genDiv")[0].style.display = "none"


async function uploadFiles() {
    document.getElementById("landingDiv").style.display = "none";
    document.getElementById("uploadForm").style.display = "none";
    document.getElementsByClassName("genDiv")[0].style.display = "block";

    let ll = document.getElementsByClassName('custom-file-input')

    let files = []
    for (let i = 0; i < ll.length; i++) {
        const element = ll[i];
        for (let y = 0; y < element.files.length; y++) {
            const file = element.files[y];
            file.layer_index = i;
            files.push(file)
        }
    }
    sendFiles(files)

}

const form = document.getElementById('uploadForm')

const sendFiles = async (files) => {
    console.log('sending files')
    const myFiles = files

    const formData = new FormData()

    Object.keys(myFiles).forEach(key => {
        formData.append(myFiles[key].layer_index, myFiles[key])
    })

    let myHeaders = new Headers()
    myHeaders.append('token', myToken)

    const response = await fetch('/upload', {
        method: 'POST',
        headers: myHeaders,
        body: formData
    })

    const json = await response.json()


    console.log(json)
}


function generate() {
    const token = document.getElementById('token').value;
    const nftQuantity = document.getElementById('nftQuantity').value;
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("nftq", nftQuantity);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("/generate", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            document.getElementsByClassName('row')[0].innerHTML = result;
        })
        .catch(error => console.log('error', error));
}

function showUploadForm() {
    document.getElementById("uploadForm").style.display = "block";
    document.getElementById("landingDiv").style.display = "none";
}
function generateToken() {
    const Chars = 'AZERTYUIOPQSDFGHJKLMMWXCVBNazertyuiopqsdfghjklmwxcvbn09876543210987654321';
    let toReturn = '';
    for (let i = 0; i < 64; i++) {
        toReturn += Chars.charAt(Math.floor(Math.random() * 73))
    }
    return toReturn
}

function addLayer() {
    //uploadFiles()
    const layers = document.getElementById("uploadForm")
    layers.removeChild(document.getElementById('uploadButton'))
    layers.removeChild(document.getElementById('buttonAdd'))
    let layer_index = layers.childElementCount - 1;
    layers.innerHTML += `
                <div class="fileLayer" id="layer${layer_index}">
                    <h3>Layer ${layer_index}</h3>
                    <input type="file" class="custom-file-input" name="files_layer_${layer_index}" accept="image/png" multiple />
                </div>
                <button class="btn" id="uploadButton" onclick="uploadFiles()">Upload</button>
                <button class="btn" id="buttonAdd" onclick="addLayer()">Add Layer</button>
            `
    document.getElementById('token').value = myToken;

}