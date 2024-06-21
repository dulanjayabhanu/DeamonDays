//Game UI animation part

var btnClickSound = new Audio("sounds/btn-click.wav");
var gameStorySound = new Audio("sounds/game-story.mp3");
var gameStartSound = new Audio("sounds/game-start.mp3");
var gameNextSound = new Audio("sounds/game-next.mp3");
var progressUpSound = new Audio("sounds/progress-up.mp3");
var gameOverSound = new Audio("sounds/game-over.mp3");
var vikingDeadSound = new Audio("sounds/viking-dead.mp3");
var jumpSound = new Audio("sounds/jump.mp3");
var demonGrowlSound = new Audio("sounds/demon-growl.wav");
var charatorChange = new Audio("sounds/charactor-change.mp3");
var lastGameSound = new Audio("sounds/last-game.mp3");
var winSound = new Audio("sounds/win.mp3");
var startWindowSound = new Audio("sounds/start-window-sound.ogg");
var chestLoot = new Audio("sounds/chest-loot.mp3");

var startWindow = document.getElementById("start-window");
var mainBox = document.getElementById("main-box");
var infoBox = document.getElementById("main-instruction-box");
var inGameInfoBox = document.getElementById("ingame-info-box");
var gameStoryBox = document.getElementById("game-story");
var profile = document.getElementById("profile");
var nextBox = document.getElementById("next-box");
var gameOverWindow = document.getElementById("game-over-window");
var gameWinWindow = document.getElementById("game-win-window");
var newGameSoundBtn1 = document.getElementById("newgame-sound-btn1");
var newGameSoundBtn2 = document.getElementById("newgame-sound-btn2");

var infoBoxMarginTop = 1010;

var inGameInfoBoxCaller = 0;

var infoCounter = 0;
var infoOpacity = 0;

var infoBoxMoveUpCaller = 0;
var infoBoxMoveDownCaller = 0;

var gameHolder = false;

var soundVolume = 0.8;
var startWindowSoundCheck = 2;

function gameStory() {
    vikingMarginLeft = -200;
    newGameSoundBtn1.style.display = "none";
    newGameSoundBtn2.style.display = "none";
    viking.style.marginLeft = vikingMarginLeft + "px";
    gameStoryBox.style.visibility = "visible";
    background.style.visibility = "hidden";
    objects.style.visibility = "hidden";
    viking.style.visibility = "hidden";
    startWindow.style.visibility = "hidden";
    mainBox.style.visibility = "visible";
    startWindowSound.volume = 0;
    gameStorySoundPlay();
    btnClickSoundPlay();
}

function gameStart() {
    gameStorySound.pause();
    infoBoxMarginTop = 1010;
    vikingMarginLeft = -200;
    clearInterval(infoBoxMoveUpCaller);
    clearInterval(infoBoxMoveDownCaller);
    profile.src = "images/profile1.png";
    gameStoryBox.style.visibility = "hidden";
    background.style.visibility = "visible";
    objects.style.visibility = "visible";
    viking.style.visibility = "visible";
    backgroundAnimationCaller = setInterval(backgroundAnimation, 73);
    vikingRunCaller = setInterval(vikingRunAnimation, 90);
    objectAnimation();
    chestCreate();
    scoreCaller = setInterval(scoreAnimation, 140);
    objects.style.visibility = "visible";
    gameStartSoundPlay();
    btnClickSoundPlay();
}

function infoBoxMoveUp() {
    startWindow
    infoBoxMarginTop = infoBoxMarginTop - 40;
    infoBox.style.marginTop = infoBoxMarginTop + "px";
    if (infoBoxMarginTop < 0) {
        clearInterval(infoBoxMoveUpCaller);
    }
}

function infoBoxMoveUpStart() {
    if (infoBoxMoveUpCaller == 0) {
        infoBox.style.display = "block";
        infoBoxMoveUpCaller = setInterval(infoBoxMoveUp, 50);
        infoBoxMoveDownCaller = 0;
        btnClickSoundPlay();
    }
}

function infoBoxMoveDown() {
    infoBoxMarginTop = infoBoxMarginTop + 40;
    infoBox.style.marginTop = infoBoxMarginTop + "px";
    if (infoBoxMarginTop == 1010) {
        clearInterval(infoBoxMoveDownCaller);
        infoBox.style.display = "none";
    }
}

function infoBoxMoveDownStart() {
    if (infoBoxMoveDownCaller == 0) {
        infoBoxMoveDownCaller = setInterval(infoBoxMoveDown, 50);
        infoBoxMoveUpCaller = 0;
        btnClickSoundPlay();
    }
}

function inGameInfoStart() {
    if (infoCounter <= 3) {
        infoCounter = infoCounter + 0.05;
        infoOpacity = infoOpacity + 0.05;
        inGameInfoBox.style.opacity = infoOpacity + "";
    }
    if (infoCounter >= 3) {
        infoCounter = infoCounter + 0.05;
        infoOpacity = infoOpacity - 0.4;
        inGameInfoBox.style.opacity = infoOpacity + "";
    }
    if (infoCounter > 3.5) {
        clearInterval(inGameInfoBoxCaller);
        infoCounter = 0;
        infoOpacity = 0;
        inGameInfoBoxCaller = 0;
    }
}

function inGameInfoAnimation() {
    if (inGameInfoBoxCaller == 0) {
        inGameInfoBoxCaller = setInterval(inGameInfoStart, 100);
        btnClickSoundPlay();
    }
}

function scoreAnimation() {
    if (gameHolder == false) {
        scoreCounter = scoreCounter + 2;
    }
    score.innerHTML = scoreCounter;
    document.getElementById("score-bar").appendChild(score);
}

function gameClose() {
    window.location = "index.html";
    btnClickSoundPlay();
}


//Game charator animation part

var vikingRunAnimationNumber = 0;
var vikingJumpAnimationNumber = 0;
var vikingDeadAnimationNumber = 0;

var vikingRunCaller = 0;
var vikingJumpCaller = 0;
var vikingLastJumpCaller = 0;
var vikingDeadCaller = 0;

var vikingMarginLeft = 0;
var vikingMarginTop = 326;

var vikingType = 1;

var viking = document.getElementById("viking");
var background = document.getElementById("background");
var objects = document.getElementById("objects");
var layer2 = document.getElementById("layer2");
var layer3 = document.getElementById("layer3");
var level1Img = document.getElementById("level1-img");
var level2Img = document.getElementById("level2-img");
var level3Img = document.getElementById("level3-img");
var level4Img = document.getElementById("level4-img");
var level5Img = document.getElementById("level5-img");
var score = document.getElementById("score");
var gameOverScore = document.getElementById("game-over-score");

var backgroundPositionX = 0;

var backgroundAnimationCaller = 0;
var objectAnimationCaller = 0;

var objectMarginLeft = 900;

var levelCounter = 0;
var scoreCounter = 0;

var mainGameCounter = 1;

var lastBackgroundMove = true;
var lastRunMove = true;

var levelSpeed = 73;

var lastJumpCounter = 1;

var keyValidation = false;

var startWindowSoundBtnCheck1 = false;
var startWindowSoundBtnCheck2 = false;

var chestMarginLeft = 1270;
var chestAnimationCaller = 0;

function vikingRunAnimation() {
    if (vikingMarginLeft <= 200 | lastRunMove == false) {
        vikingMarginLeft = vikingMarginLeft + 9;
    }
    vikingRunAnimationNumber = vikingRunAnimationNumber + 1;
    if (vikingMarginLeft > 728) {
        clearInterval(vikingRunCaller);
        vikingLastJumpCaller = setInterval(vikingLastJumpAnimation, 100);
        winSound.play();
    }
    if (vikingRunAnimationNumber == 11) {
        vikingRunAnimationNumber = 1;
    }
    viking.style.marginLeft = vikingMarginLeft + "px";
    viking.src = "images/viking" + vikingType + "/Run " + vikingRunAnimationNumber + ".png";
}

function backgroundAnimation() {
    backgroundPositionX = backgroundPositionX - 10;
    background.style.backgroundPositionX = backgroundPositionX + "px";
    objects.style.backgroundPositionX = backgroundPositionX + "px";
    if (lastBackgroundMove == false) {
        if (backgroundPositionX == -560) {
            clearInterval(backgroundAnimationCaller);
            lastRunMove = false;
        }
    }
}

function objectAnimation() {
    for (var counter = 0; counter < 140; counter++) {
        var objectDistance = (Math.floor(Math.random() * 5));
        if (objectDistance == 0) {
            objectMarginLeft = objectMarginLeft + 380; // min distance- 380 max distance- 780
        }
        if (objectDistance == 1) {
            objectMarginLeft = objectMarginLeft + 350;
        }
        if (objectDistance == 2) {
            objectMarginLeft = objectMarginLeft + 300;
        }
        if (objectDistance == 3) {
            objectMarginLeft = objectMarginLeft + 310;
        }
        if (objectDistance == 4) {
            objectMarginLeft = objectMarginLeft + 500;
        }
        var object = document.createElement("div");
        object.className = "object1";
        object.id = "objectId" + counter;
        object.style.marginLeft = objectMarginLeft + "px";
        objects.appendChild(object);
    }
    objectAnimationCaller = setInterval(objectAnimationStart, levelSpeed);

}

function objectAnimationStart() {
    if (gameHolder == false) {
        for (var counter = 0; counter < 140; counter++) {
            var objectBox = document.getElementById("objectId" + counter);
            var currentMarginLeft = window.getComputedStyle(objectBox).marginLeft;
            var newMarginLeft = parseInt(currentMarginLeft) - 10;
            objectBox.style.marginLeft = newMarginLeft + "px";
            if (newMarginLeft <= 198 & newMarginLeft >= 140 & vikingMarginTop > 265) { // dead animation trigger area
                clearInterval(chestAnimationCaller);
                clearInterval(scoreCaller);
                clearInterval(backgroundAnimationCaller);
                clearInterval(objectAnimationCaller);
                clearInterval(vikingJumpCaller);
                clearInterval(vikingRunCaller);
                vikingDeadSound.play();
                vikingDeadCaller = setInterval(vikingDeadAnimation, 100);
            }
            if (newMarginLeft == 210) {
                levelCounter = levelCounter + 1;
                if ((Math.floor(Math.random() * 27) + 1) == levelCounter) {
                    demonGrowlSoundPlay();
                }
                if (levelCounter >= 3) {
                    if (levelCounter == 3) {
                        progressUpSound.currentTime = 0;
                        progressUpSound.play();
                    }
                    layer2.src = "images/layer2-1.png";
                }
                if (levelCounter > 7) {
                    if (levelCounter == 8) {
                        progressUpSound.currentTime = 0;
                        progressUpSound.play();
                    }
                    layer2.src = "images/layer2-1.png";
                    layer2.src = "images/layer2-2.png";
                }
                if (levelCounter >= 14) {
                    if (levelCounter == 14) {
                        progressUpSound.currentTime = 0;
                        progressUpSound.play();
                    }
                    layer2.src = "images/layer2-1.png";
                    layer2.src = "images/layer2-3.png";
                }
                if (levelCounter == 28) {
                    progressUpSound.currentTime = 0;
                    progressUpSound.play();
                    layer2.src = "images/layer2-1.png";
                    layer2.src = "images/layer2-4.png";
                }
            }
            if (newMarginLeft == 0) {
                if (levelCounter == 28) {
                    gameNextSound.play();
                    levelCounter = 0;
                    mainGameCounter = mainGameCounter + 1;
                    nextBox.style.visibility = "visible";
                    layer2.src = "images/layer3.png";
                    layer2.style.transitionDuration = "0.3s";
                    profile.src = "images/profile0.png";
                    profile.style.transitionDuration = "0.3s";
                    level1Img.style.filter = "brightness(1.6)";
                    level1Img.style.transitionDuration = "0.3s";
                    gameHolder = true;

                    if (mainGameCounter == 2) {
                        level1Img.src = "images/level2.png";
                        level1Img.style.transitionDuration = "0.3s";
                        level1Img.style.filter = "brightness(1.6)";
                        background.className = "background-layer2";
                        objects.className = "objects2";
                        vikingType = 1;
                        for (var counter = 0; counter < 140; counter++) {
                            document.getElementById("objectId" + counter).className = "object2";
                        }
                    }
                    if (mainGameCounter == 3) {
                        level2Img.src = "images/level2.png";
                        level2Img.style.transitionDuration = "0.3s";
                        level2Img.style.filter = "brightness(1.6)";
                        background.className = "background-layer3";
                        objects.className = "objects3";
                        vikingType = 2;
                        for (var counter = 0; counter < 140; counter++) {
                            document.getElementById("objectId" + counter).className = "object3";
                        }
                    }
                    if (mainGameCounter == 4) {
                        level3Img.src = "images/level2.png";
                        level3Img.style.transitionDuration = "0.3s";
                        level3Img.style.filter = "brightness(1.6)";
                        background.className = "background-layer4";
                        objects.className = "objects4";
                        vikingType = 2;
                        for (var counter = 0; counter < 140; counter++) {
                            document.getElementById("objectId" + counter).className = "object4";
                        }
                    }
                    if (mainGameCounter == 5) {
                        level4Img.src = "images/level2.png";
                        level4Img.style.transitionDuration = "0.3s";
                        level4Img.style.filter = "brightness(1.6)";
                        background.className = "background-layer5";
                        objects.className = "objects5";
                        vikingType = 3;
                        levelSpeed = 80;
                        for (var counter = 0; counter < 140; counter++) {
                            document.getElementById("objectId" + counter).className = "object5";
                        }
                    }
                    if (mainGameCounter == 6) {
                        nextBox.className = "next-box-last";
                        level5Img.src = "images/level2.png";
                        level5Img.style.transitionDuration = "0.3s";
                        level5Img.style.filter = "brightness(1.6)";
                        vikingType = 3;
                        clearInterval(scoreCaller);
                        clearInterval(vikingJumpCaller);
                        clearInterval(vikingDeadCaller);
                        objects.style.visibility = "hidden";
                        background.className = "last-background";
                        clearInterval(objectAnimationCaller);
                        clearInterval(chestAnimationCaller);
                        backgroundPositionX = 0;
                        viking.style.transform = "scale(0.9)";
                        viking.style.marginTop = "335px";
                        keyValidation = true;
                    }
                }
            }
        }
    }
}

function chestCreate() {
    for (var chestCounter = 0; chestCounter < 139; chestCounter++) {
        var chestDistance = (Math.floor(Math.random() * 5));
        if (chestDistance == 0) {
            chestMarginLeft = chestMarginLeft + 610; // min distance- 380 max distance- 780
        }
        if (chestDistance == 1) {
            chestMarginLeft = chestMarginLeft + 600;
        }
        if (chestDistance == 2) {
            chestMarginLeft = chestMarginLeft + 610;
        }
        if (chestDistance == 3) {
            chestMarginLeft = chestMarginLeft + 600;
        }
        if (chestDistance == 4) {
            chestMarginLeft = chestMarginLeft + 620;
        }
        var chest = document.createElement("div");
        chest.className = "chest";
        chest.style.marginLeft = chestMarginLeft + "px";
        chest.id = "chest" + chestCounter;
        objects.appendChild(chest);
    }
    chestAnimationCaller = setInterval(chestAnimation, 73);
}

function chestAnimation() {
    if (gameHolder == false) {
        for (var chestCounter = 0; chestCounter < 139; chestCounter++) {
            var chest = document.getElementById("chest" + chestCounter);
            var currentChestMarginLeft = window.getComputedStyle(chest).marginLeft;
            var newChestMarginLeft = parseInt(currentChestMarginLeft) - 10;
            chest.style.marginLeft = newChestMarginLeft + "px";
            if (newChestMarginLeft <= 250 & newChestMarginLeft >= 175 & vikingMarginTop > 290) {
                chest.style.transform = "scale(1.16)";
                chest.style.visibility = "hidden";
                chestLoot.play();
                scoreCounter = scoreCounter + 500;
            }
        }
    }
}

function nextBtnAnimation() {
    nextBox.style.visibility = "hidden";
    layer2.src = "images/layer2.png";
    if (mainGameCounter == 2) {
        profile.src = "images/profile1.png";
    }
    if (mainGameCounter == 3) {
        charatorChange.play();
        profile.src = "images/profile2.png";
    }
    if (mainGameCounter == 4) {
        profile.src = "images/profile2.png";
    }
    if (mainGameCounter == 5) {
        charatorChange.play();
        profile.src = "images/profile3.png";
        gameStartSoundPause();
        lastGameSound.play();
        lastGameSound.loop = true;
    }
    if (mainGameCounter == 6) {
        charatorChange.play();
        layer2.src = "images/layer3.png";
        profile.src = "images/profile3.png";
        lastBackgroundMove = false;
    }
    gameHolder = false;
}

function vikingJumpAnimation() {
    vikingJumpAnimationNumber = vikingJumpAnimationNumber + 1;
    if (vikingJumpAnimationNumber >= 2) {
        if (vikingJumpAnimationNumber <= 5) {
            vikingMarginTop = vikingMarginTop - 40;
            viking.style.marginTop = vikingMarginTop + "px";
        }
        if (vikingJumpAnimationNumber >= 6) {
            if (vikingJumpAnimationNumber < 10) {
                vikingMarginTop = vikingMarginTop + 40;
                viking.style.marginTop = vikingMarginTop + "px";
            }
        }
    }

    if (vikingJumpAnimationNumber == 11) {
        vikingJumpAnimationNumber = 1;
        clearInterval(vikingJumpCaller);
        vikingRunCaller = setInterval(vikingRunAnimation, 100);
        vikingJumpCaller = 0;
    }
    viking.src = "images/viking" + vikingType + "/Jump " + vikingJumpAnimationNumber + ".png";
}

function vikingLastJumpAnimation() {
    vikingJumpAnimationNumber = vikingJumpAnimationNumber + 1;
    if (vikingJumpAnimationNumber == 11) {
        vikingJumpAnimationNumber = 1;
        lastJumpCounter = lastJumpCounter + 1;
        if (lastJumpCounter == 4) {
            clearInterval(vikingLastJumpCaller);
            gameWinWindow.style.visibility = "visible";
            var currentSocre = document.getElementById("game-win-score").innerHTML = scoreCounter;
            document.getElementById("game-win-box").appendChild(currentSocre);
        }
    }
    viking.src = "images/viking" + vikingType + "/Jump " + vikingJumpAnimationNumber + ".png";
}

function vikingDeadAnimation() {
    vikingDeadAnimationNumber = vikingDeadAnimationNumber + 1;
    if (vikingDeadAnimationNumber == 11) {
        viking.style.marginTop = "326px";
        vikingDeadAnimationNumber = 10;
        chestLoot.pause();
        clearInterval(vikingJumpCaller);
        jumpSound.pause();
        clearInterval(vikingDeadCaller);
        clearInterval(vikingRunCaller);
        gameStartSoundPause();
        vikingDeadSound.pause();
        gameOverSoundPlay();
        gameOverWindow.style.visibility = "visible";
        var currentSocre = document.getElementById("game-over-score").innerHTML = scoreCounter;
        document.getElementById("game-over-box").appendChild(currentSocre);
    }
    viking.src = "images/viking" + vikingType + "/Die " + vikingDeadAnimationNumber + ".png";
}

function btnClickSoundPlay() {
    btnClickSound.currentTime = 0;
    btnClickSound.play();
    btnClickSound.volume(0.5);
}

function gameStorySoundPlay() {
    gameStorySound.currentTime = 0;
    gameStorySound.play();
    gameStorySound.loop = true;
}

function gameStartSoundPlay() {
    gameStartSound.currentTime = 0;
    gameStartSound.play();
    gameStartSound.loop = true;
}

function gameStartSoundPause() {
    gameStartSound.pause();
}

function gameOverSoundPlay() {
    gameOverSound.play();
    gameOverSound.loop = true;
}

function demonGrowlSoundPlay() {
    demonGrowlSound.currentTime = 0;
    demonGrowlSound.play();
    demonGrowlSound.volume = 0.3;
}

function mainSoundVolumeUp() {
    soundVolume = soundVolume + 0.1;
    if (soundVolume > 1) {
        soundVolume = 1;
    }
    gameStorySound.volume = soundVolume;
    gameStartSound.volume = soundVolume;
    gameOverSound.volume = soundVolume;
    lastGameSound.volume = soundVolume;
}

function mainSoundVolumeDown() {
    soundVolume = soundVolume - 0.1;
    if (soundVolume < 0) {
        soundVolume = 0;
    }
    gameStorySound.volume = soundVolume;
    gameStartSound.volume = soundVolume;
    gameOverSound.volume = soundVolume;
    lastGameSound.volume = soundVolume;
}

function startWindowSoundPlay() {
    if (startWindowSoundBtnCheck1 == false) {
        startWindowSound.play();
        startWindowSound.loop = true;
        startWindowSound.volume = 0.5;
        document.getElementById("newgame-sound-btn1").style.visibility = "hidden";
        document.getElementById("newgame-sound-btn2").style.visibility = "visible";
        startWindowSoundBtnCheck1 = true;
        startWindowSoundBtnCheck2 = false;
    }
}

function startWindowSoundPause() {
    if (startWindowSoundBtnCheck2 == false) {
        startWindowSound.pause();
        document.getElementById("newgame-sound-btn1").style.visibility = "visible";
        document.getElementById("newgame-sound-btn2").style.visibility = "hidden";
        startWindowSoundBtnCheck2 = true;
        startWindowSoundBtnCheck1 = false;
    }
}

function keyListener(event) {
    var key = event.which;
    if (key == 32 | key == 38) {
        if (vikingJumpCaller == 0 & keyValidation == false) {
            clearInterval(vikingRunCaller);
            jumpSound.currentTime = 0;
            jumpSound.play();
            jumpSound.volume = 0.5;
            vikingJumpCaller = setInterval(vikingJumpAnimation, 130);
        }
    }
    if (key == 27) {
        gameClose();
    }
}