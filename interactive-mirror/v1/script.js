// Get references to video and canvas elements
const videoElement = document.getElementById("videoElement");
const canvasElement = document.getElementById("canvasElement");
const canvasContext = canvasElement.getContext("2d");

// Access the camera stream
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    videoElement.srcObject = stream;
    videoElement.play();
  })
  .catch((error) => {
    console.error("Error accessing the camera: ", error);
  });

// Load the face-api.js models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("face-api/weights"),
  faceapi.nets.faceLandmark68Net.loadFromUri("face-api/weights"),
])
  .then(startFaceDetection)
  .catch((error) => {
    console.error("Error loading face-api models: ", error);
  });

// Start face detection
function startFaceDetection() {
  // Resize the canvas to match the video size
  faceapi.matchDimensions(canvasElement, videoElement);

  // Perform face detection on each frame
  setInterval(async () => {
    // Detect faces in the video frame
    const detections = await faceapi
      .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw only the face region on the canvas
    const resizedDetections = faceapi.resizeResults(detections, videoElement);
    resizedDetections.forEach((detection) => {
      const { x, y, width, height } = detection.detection.box;
      canvasContext.drawImage(
        videoElement,
        x,
        y,
        width,
        height,
        x,
        y,
        width,
        height
      );
    });
  }, 100); // Adjust the interval as needed
}
