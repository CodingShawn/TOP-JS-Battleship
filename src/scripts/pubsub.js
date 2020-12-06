const pubsub = (() => {
  const events = {};

  function subscribe(eventName, callback) {
    events[eventName] = events[eventName] || [];
    events[eventName].push(callback);
  }

  function publish(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((callback) => {
        callback(data);
      });
    }
  }

  function unsubscribe(eventName, callback) {
    if (events[eventName]) {
      for (let i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === callback) {
          events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  return { subscribe, publish, unsubscribe };
})();

export default pubsub