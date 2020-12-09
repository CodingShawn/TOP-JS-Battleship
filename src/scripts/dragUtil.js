import pubsub from "./pubsub";

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  {
    var isHorizontal;
    event.dataTransfer.getData("isHorizontal") == "true"
      ? (isHorizontal = true)
      : (isHorizontal = false);
    let dragPos = parseInt(event.dataTransfer.getData("pos"));
    let length = parseInt(event.dataTransfer.getData("length"));
    let shipID = event.dataTransfer.getData("shipID");
    if (isHorizontal) {
      var x = parseInt(event.target.getAttribute("data-x")) - dragPos;
      var y = parseInt(event.target.getAttribute("data-y"));
      if (x >= 0 && x < 10 && x + length <= 10 && y >= 0 && y < 10) {
        pubsub.publish("Create ship", [x, y, length, isHorizontal, shipID]);
      }
    } else {
      var x = parseInt(event.target.getAttribute("data-x"));
      var y = parseInt(event.target.getAttribute("data-y")) - dragPos;
      if (x >= 0 && x < 10 && y >= 0 && y < 10 && y + length <= 10) {
        pubsub.publish("Create ship", [x, y, length, isHorizontal, shipID]);
      }
    }
  }
}

function drag(event) {
  event.dataTransfer.setData("shipID", event.target.id);
  event.dataTransfer.setData(
    "length",
    event.target.getAttribute("data-length")
  );
  event.dataTransfer.setData("pos", event.target.getAttribute("data-pos"));
  event.dataTransfer.setData(
    "isHorizontal",
    event.target.getAttribute("data-isHorizontal")
  );
}

export { allowDrop, drop, drag };
