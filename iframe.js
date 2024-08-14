// Listen for messages from the main thread
window.addEventListener("message", function (event) {
  if (event.data.type === "sharedBuffer") {
    const sharedBuffer = event.data.buffer;
    const sharedArray = new Int32Array(sharedBuffer);

    console.log("iframe: Received SharedArrayBuffer");
    console.log("iframe: Initial value:", sharedArray[0]);

    // Modify the value
    sharedArray[0] = 100;

    console.log("iframe: Updated value:", sharedArray[0]);

    // Send a confirmation message back to the main thread
    window.parent.postMessage(
      {
        type: "confirmation",
      },
      "*"
    );
  }
});
