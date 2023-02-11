const gg = generateToken();
document.getElementById('token').value = gg;
console.log(gg)

document.getElementById("uploadForm").style.display = "none";

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
    const layers = document.getElementById("uploadForm")
    layers.removeChild(document.getElementById('submitButton'))
    layers.removeChild(document.getElementById('buttonAdd'))
    let layer_index = layers.childElementCount - 1;
    layers.innerHTML += `
                <div class="fileLayer" id="layer${layer_index}">
                    <input type="file" text="${layer_index}" name="files_layer_${layer_index}" accept="image/png" multiple />
                </div>
                <input class="btn" type='submit' id="submitButton" value='Upload' />
                <button class="btn" id="buttonAdd" onclick="addLayer()">Add Layer</button>
            `
    document.getElementById('token').value = gg;

}