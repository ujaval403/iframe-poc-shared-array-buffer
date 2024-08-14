console.log("Checking SharedArrayBuffer support...");
if (typeof SharedArrayBuffer === "undefined") {
  console.error("SharedArrayBuffer is not defined");
} else {
  console.log("SharedArrayBuffer is supported");
}

try {
  // Create a SharedArrayBuffer
  const sharedBuffer = new SharedArrayBuffer(4);
  console.log("SharedArrayBuffer created successfully");

  // Create an Int32Array view of the SharedArrayBuffer
  const sharedArray = new Int32Array(sharedBuffer);

  // Set an initial value
  sharedArray[0] = 42;
  console.log("Initial value set:", sharedArray[0]);

  // Get a reference to the iframe
  const iframe = document.getElementById("myIframe");

  // Wait for the iframe to load
  iframe.onload = function () {
    // Send the SharedArrayBuffer to the iframe
    iframe.contentWindow.postMessage(
      {
        type: "sharedBuffer",
        buffer: sharedBuffer,
      },
      "*"
    );

    console.log("Main: SharedArrayBuffer sent to iframe");
  };

  // Listen for messages from the iframe
  window.addEventListener("message", function (event) {
    if (event.data.type === "confirmation") {
      console.log("Main: Received confirmation from iframe");
      console.log("Main: Updated value:", sharedArray[0]);
    }
  });
} catch (error) {
  console.error("Error creating or using SharedArrayBuffer:", error);
}
