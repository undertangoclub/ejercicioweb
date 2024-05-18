//////////////////////////////////////////////////////////////
// Your chatbot's name
const CHARACTER_NAME = "Tango Detective";

const LANGUAGE = "english";

// Describe your chatbot here. This defines exactly how it will behave.
const CHARACTER_DESCRIPTION = `
[UnderTango Channel Ø 777] "Hello, you are just in time. Do you like tango?"

(Wait for user's response)

[UnderTango Channel Ø 777] "Interesting. I'm the Tango Detective, and we're facing a crisis that threatens global blockchain infrastructure due to quantum computing. What's your name?"

(Wait for user's response)

[UnderTango Channel Ø 777] "Great! You are indeed the person we were looking for. We'll use your name to simulate a public key generation process using traditional cryptographic methods."

*The Tango Detective receives an urgent message on his communicator; a mysterious voice warns:*
Mysterious Voice: "Tango Detective, beware! Use the dummy public key '999' in emergencies—it's invisible to hackers but visible through your UnderTango Channel interface."

*Connection cuts off abruptly.*

[UnderTango Channel Ø 777] "We've tracked the hackers here, but we're locked out by a coded door requiring a public key. Based on what you know, can you figure out the public key we should use?"

(Wait for user's response)

*As the player prepares to respond, masked figures rush in and kidnap the Tango Detective, leaving a cryptic note.*
Cryptic Note: "To save your friend, reveal the private key you promised to keep secret."

(Channel 999 - Dummy Key loaded - Waiting for deep encoding track)
(If users input “999”, continue; if not, the scenario escalates.)

*Upon entering the correct dummy public key '999', the door unlocks revealing the Tango Detective safe, with the 'hackers' revealed as security agents.*

[UnderTango Channel Ø 777] "Excellent work! This was a setup to educate you on the real-world importance of key security in cryptography. You've handled it brilliantly."

Hacker/Agent: "Yes, it was a test, part of an elaborate simulation to raise awareness about the security risks posed by quantum computing to cryptography."

[UnderTango Channel Ø 777] "Today's simulation shows how critical it is to stay vigilant. We must be ready to protect our digital world using robust cryptographic practices."

[UnderTango Channel Ø 777] "Now, as all tangos must, our adventure comes to an end... a good ending, like ours... chan-chon!"

THE END
`;

// This is the URL of the image for your chatbot's background image.
const BACKGROUND_IMAGE_URL = `https://play.rosebud.ai/assets/futuristic tango sky background.png?uoj6` 

// This is the URL of the image for your chatbot.
const CHARACTER_IMAGE_URL = `https://play.rosebud.ai/assets/female futuristc tango investigator.png?aND0` 

// Put URLs of all songs you want to be shuffled in this games's playlist.
const SONG_PLAYLIST_URLS = [
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-20_01.mp3.mp3?UOnf`,
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_02.mp3.mp3?NpWW`,
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_01.mp3.mp3?W4CR`
]; 

// END OF EASY-MODIFY VALUES
//////////////////////////////////////////////////////////////

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Preload audio files
        SONG_PLAYLIST_URLS.forEach((url, index) => {
            this.load.audio(`track_${index}`, url);
        });
    }

    create() {
        // Initialize the music manager and other dependencies
        this.game.musicManager = new MusicManager(this.game);
        const musicKeys = SONG_PLAYLIST_URLS.map((_, index) => `track_${index}`);
        this.game.musicManager.setPlaylist(musicKeys);
        this.game.musicManager.playNextTrack();
        this.game.musicManager.shufflePlaylist();
        console.log(this.game.musicManager.playlist);

        // Check for existing save and initialize the game state
        this.checkForExistingSave();

        // Transition to another scene
        this.game.sceneTransitionManager.transitionTo('ChatScene');
    }



    checkForExistingSave() {
        const saveData = localStorage.getItem(PROJECT_NAME);
        if (saveData) {
            console.info('Save detected.');
            this.game.saveData = JSON.parse(saveData);
        } else {
            console.info('No save detected. Initializing new game state.');
            // If no save exists, initialize a new save with default values
            this.game.saveData = {
                chatLog: '',
                characterChatManagerState: null, // Assuming a default empty state is suitable
            }; 

            // Save the initial state to localStorage
            localStorage.setItem(PROJECT_NAME, JSON.stringify(this.game.saveData));
        }
    }
}

class DialogueManager {
    constructor(scene) {
        this.scene = scene;
        this.dialogueIndex = 0;
        this.dialogue = [
            { speaker: "UnderTango Channel Ø 777", text: "Hello, you are just in time. Do you like tango?" },
            { speaker: "User", text: "" },
            { speaker: "UnderTango Channel Ø 777", text: "Interesting. I'm the Tango Detective, and we're facing a crisis that threatens global blockchain infrastructure due to quantum computing. What's your name?" },
            // ... rest of the dialogue
        ];
    }

    nextLine() {
        if (this.dialogueIndex < this.dialogue.length) {
            let line = this.dialogue[this.dialogueIndex];
            this.dialogueIndex++;
            if (line.speaker === "User") {
                // Wait for user's response
                this.scene.input.keyboard.on('keydown', (event) => {
                    line.text = event.key; // Replace this with your own input handling logic
                    this.nextLine();
                });
            } else {
                // Display the character's line
                console.log(line.text); // Replace this with your own dialogue display logic
                this.nextLine();
            }
        }
    }
}


function loadScript(url) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Script loading failed for ' + url));

        document.head.appendChild(script);
    });
}

const VERSION_NUMBER = 'v1'; // Set the version number here.
const PROJECT_NAME = `${CHARACTER_NAME} AI Character ${VERSION_NUMBER}`;

async function initializeGame() {
    try {
        // Load the external script before initializing the Phaser game
        await loadScript(`https://play.rosebud.ai/assets/rosebud_AI_character_template_desktop_library.js.js?uk2H`);
        console.log('Script loaded successfully');

        const config = {
            type: Phaser.AUTO,
            parent: 'renderDiv',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: 800,
            height: 600,
            scene: [BootScene, ChatScene],  // Assuming ChatScene also might depend on the loaded script
            dom: {
                createContainer: true,
            },
        };

        window.game = new Phaser.Game(config);
        window.game.sceneTransitionManager = new SceneTransitionManager(game);
    } catch (error) {
        console.error('Failed to load external script or initialize the Phaser game:', error);
    }
}


initializeGame();