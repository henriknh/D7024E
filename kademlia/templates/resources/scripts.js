function send(b) {

  var filename = document.getElementById('filename').value
  var content  = document.getElementById('content').value

  var filenameEmpty = false
  var contentEmpty = false
  if(b.id == "store" && content == "") {
    contentEmpty = true
  }
  if (filename == "") {
    filenameEmpty = true
  }
  if(filenameEmpty && contentEmpty) {
    alert("Filename and content cant be empty")
    return
  }
  if(filenameEmpty) {
    alert("Filename cant be empty")
    return
  }
  if(contentEmpty) {
    alert("Content cant be empty")
    return
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = document.getElementById("result")

      switch(b.id) {
        case "store":
          if(xhr.responseText == "1") {
            result.innerHTML = "File stored!";
          } else {
            result.innerHTML = "There was a problem storing the file";
          }
          break
        case "cat":
          if(xhr.responseText != "0") {
            result.innerHTML = "File content:<br>"+xhr.responseText;
          } else {
            result.innerHTML = "There was a problem finding the file";
          }
          break
        case "pin":
          if(xhr.responseText == "1") {
            result.innerHTML = "File pinned!";
          } else {
            result.innerHTML = "There was a problem pinning the file";
          }
          break
        case "unpin":
          if(xhr.responseText == "1") {
            result.innerHTML = "File unpinned!";
          } else {
            result.innerHTML = "There was a problem unpinning the file";
          }
          break
      }
    }
  }

  switch(b.id) {
    case "store":
      xhr.open("POST", "/store", true);
      data = {"Filename": filename, "Content": content}
      break
    case "cat":
      xhr.open("GET", "/cat", true);
      data = {"Filename": filename}
      break
    case "pin":
      xhr.open("POST", "/pin", true);
      data = {"Filename": filename}
      break
    case "unpin":
      xhr.open("POST", "/unpin", true);
      data = {"Filename": filename}
      break
    default:
      console.log("what button is that even!?");
      return
  }

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

}