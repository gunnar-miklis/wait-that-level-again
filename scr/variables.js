// NOTE: General 
const WIDTH = 800;
const HEIGHT = 500;
let fontRegular, fontMedium, fontBold, fontBlack;

// NOTE: Game start related 
let buttonStartGame;
let gameIsStarted = false;
function startLevel() {
    gameIsStarted = true;
    // make sure it's possible to start the game again, after finishing all levels. Because "The End." sets noLoop();
    loop(); 
    // loop through levelList
    levelList.forEach( (level) => {
        // get the level (which is selected in dropdown menu) from levelList
        if ( selectedLevel.value() === level.name ) {
        // construct this level (eg. new Level3() )
        activeLevel = level.construct;
        // also set level id
        activeLevelId = level.id;
        };
        // reset characters position
        game.character.resetCharacter();
    })
}

// NOTE: Level related 
let activeLevel;
let activeLevelId = 0;
let selectedLevel; // dropdown menu
// add levels to the dropdown menu, but ONLY, when they have been started already.
function addFinishedLevelToDropdown() {
    // create <option> tags
    levelList.forEach( (level) => { if ( level.isStarted ) selectedLevel.option( level.name, level.name ) });
}
function nextLevel() {
    // increment level number
    activeLevelId++;
    // set level isStarted to: true
    if( activeLevelId < levelList.length ) levelList[activeLevelId].isStarted = true;
    // refresh dropwdown menu
    addFinishedLevelToDropdown();
    // loop leve list again
    levelList.forEach( (level) => {
        // pick next level
        if ( activeLevelId === level.id ){
            // construct next level
            activeLevel = level.construct;
            // set dropdown selection to current game
            document.querySelector('#menu select').selectedIndex = activeLevelId;
        }
        // reset characters position
        // needs to be called as most-last, AFTER events(). using condition in draw()
        doCharacterReset = true;
    })
}

// NOTE: Character related 
let doCharacterReset = false;