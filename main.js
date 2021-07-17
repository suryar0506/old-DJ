var song1 = "";
var song2 = "";

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var leftWrist_accuracy = 0;
var rightWrist_accuracy = 0;

function preload(){
song1 = loadSound("download.mp3");
song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 560);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', getPoses);
}

function modelLoaded(){
    console.log("All clear, boss!");
}

function getPoses(results){
    if (results.length > 0){
console.log(results);

leftWrist_accuracy = results[0].pose.keypoints[9].score;
console.log("Left Wrist Score: " + leftWrist_accuracy);
rightWrist_accuracy = results[0].pose.keypoints[10].score;
console.log("Right Wrist Score: " + rightWrist_accuracy);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;

console.log("Left Wrist X and Y = " + leftWristX + ", " + leftWristY);
console.log("Right Wrist X and Y = " + rightWristX + ", " + rightWristY); 
    }
}

//Idea for this project: Change the functionality to this: 1 hand up (Be it right or left) means 1st song. Both hands up means the 2nd song.

function draw(){
    image(video, 0, 0, 600, 560);

    if (leftWrist_accuracy > 0.2){
fill('red');
stroke('red');
circle(leftWristX, leftWristY, 20);
song2.stop();

var status_of_song1 = song1.isPlaying();

if(status_of_song1 == false){
    song1.play();
    document.getElementById("song_name_display").innerHTML = "New Year Countdown";
}
    } else if (rightWrist_accuracy > 0.2){
        fill('blue');
        stroke('blue');
        circle(rightWristX, rightWristY, 20)
        song2.stop();

        var status_of_song1 = song1.isPlaying();

        if(status_of_song1 == false){
            song1.play();
            document.getElementById("song_name_display").innerHTML = "New Year Countdown";
        }
    }


}