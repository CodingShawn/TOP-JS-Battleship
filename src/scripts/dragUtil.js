import pubsub from './pubsub'

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.classList.add(data);
  {
    let dragPos = parseInt(event.dataTransfer.getData("pos"));
    console.log(dragPos)
    let x = parseInt(event.target.getAttribute("data-x"));
    let y = parseInt(event.target.getAttribute("data-y")) - dragPos;
    let length = parseInt(event.dataTransfer.getData("length"));
    let horizontal = false;
    pubsub.publish('Create ship', [x, y, length, horizontal]);

  }
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.classList);
  event.dataTransfer.setData("length", event.target.getAttribute("data-length"));
  event.dataTransfer.setData("pos", event.target.getAttribute("data-pos"));
  console.log(event.target.getAttribute("data-length"))
}

export {allowDrop, drop, drag}