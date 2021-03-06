function queue(startLoop) {
  var queue = [];
  queue.active = false;
  queue.loop = startLoop;

  queue.clear = function () {
    queue = [];
    queue.active = false;
  };

  queue.next = function (i) {
    if (!queue.length) {
      queue.active = false;
      return;
    }

    var command = null;

    if (queue.loop) {
      command = queue[i % queue.length];
    } else {
      command = queue.shift();
    }

    queue.active = true;

    command();
  };

  queue.place = function (command) {
    queue.push(command);

    if (!queue.active) {
      queue.next(0);
    }
  };

  return queue;
}

module.exports = queue;
