
var pusher = new Pusher("d44e3d910d38a928e0be", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("private-aircall");

  channel.bind("update-call", (data) => {
    // Method to be dispatched on trigger.
  });