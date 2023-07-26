prediction1 = "";
prediction2 = "";

Webcam.set({
    width : 350,
    height : 350,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);
// Webcam.attach("#camera");

function takeSnap() {
    Webcam.snap(function(snap){
        document.getElementById("result").innerHTML = "<img id = 'captured_img' src = '"+ snap +"'/>";
    });
}

console.log("Ml5 version : " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("captured_img").innerHTML;
    classifier.classify(img, gotResults);
    console.log("check()");
}

function gotResults(error, results) {
    console.log("35");
    if (error) {
        console.log("before");
        console.error(error);
        console.log("after");
    } else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        console.log("43");
        if(results[0].label == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128522;";
        }
        if(results[0].label == "sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128548;";
        }
        if(results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
        console.log("62");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "And the second prediction is " + prediction2;
    var utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter_this);
}

