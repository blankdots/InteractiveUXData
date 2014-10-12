var avatar = document.getElementById('avatar'),
    imageData = '';

if (typeof window.FileReader === 'undefined') {
  console.log('fail: No FileReader API here.');
} else {
  console.log('success: FileReader API available.');
}
 
avatar.ondragover = function () { this.className = 'hover'; return false;};
avatar.ondragend = function () { this.className = ''; return false; };
avatar.ondrop = function (e) {
  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
  reader = new FileReader();
  reader.onload = function (event) {
    /*console.log(event.target);*/
    var img = document.createElement("img");
    avatar.removeChild(avatar.firstChild);
    avatar.appendChild(img);
    img.src = event.target.result;
    img.alt = "persona avatar";
    imageData = reader.result;
    return imageData;
  };
  console.log(file);
  reader.readAsDataURL(file);
  console.log(file.name);
  console.log(file.type);
  return false;
};

