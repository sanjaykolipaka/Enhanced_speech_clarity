let audioInput = document.getElementById('audioInput');
let audioPlayer = document.getElementById('audioPlayer');
let processedAudioPlayer = document.getElementById('processedAudioPlayer');
let mediaRecorder;
let audioChunks = [];

// Handle File Upload
function handleFileUpload(event) {
    let file = event.target.files[0];
    if (file) {
        let fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
    }
}

// Start Recording
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                const audioURL = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioURL;
                audioChunks = [];
            };
            document.getElementById('stopButton').disabled = false;
            document.getElementById('recordButton').disabled = true;
        });
}

// Stop Recording
function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('stopButton').disabled = true;
    document.getElementById('recordButton').disabled = false;
}

// Process Audio (Stub function, here you would send the audio to the backend for processing)
function processAudio() {
    let audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
    
    // Simulating processed audio (in a real scenario, you'd send it to the backend server and get a processed file)
    let processedAudioURL = audioPlayer.src; // Assuming the same file comes back processed
    processedAudioPlayer.src = processedAudioURL;

    // You would replace this part with an actual API call to your server like:
    // let formData = new FormData();
    // formData.append('audio', audioBlob);
    // fetch('http://your-backend-api/process-audio', {
    //    method: 'POST',
    //    body: formData
    // })
    // .then(response => response.blob())
    // .then(processedBlob => {
    //    const processedAudioURL = URL.createObjectURL(processedBlob);
    //    processedAudioPlayer.src = processedAudioURL;
    // });
}