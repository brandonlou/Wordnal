// Called when menu item is created. Logs success or failure.
const onCreated = () => {
    if(browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Menu item created successfully!");
    }
}

// Create context menu item.
browser.contextMenus.create({
    id: "word-selection",
    title: "Add word to Wordnal",
    contexts: ["selection"]
}, onCreated);

const sanitizeWord = (word) => {
    word = word.toLowerCase();
    word.trim();
    return word;
}

// Checks if word exists in an array of word objects.
const isDuplicate = (word, wordsList) => {
    for(const entry of wordsList) {
        if(entry.word == word) {
            return true;
        }
    }
    return false;
}

// Shows a notification based on a title and message string.
const showNotification = async (title, message) => {

    // Checks if user has turned notifications on or off.
    const options = await browser.storage.local.get("options");
    let notify = "on"; // Default is on.
    if(options.options) {
        notify = options.options.notifications;
    }

    if(notify == "off") {
        return;

    } else {
        browser.notifications.create({
            type: "basic",
            iconUrl: browser.extension.getURL("/icons/icon-48.png"),
            title: title,
            message: message
        });
    }

}

const addWord = async (newWord) => {

    if(typeof newWord !== "string") {
        return;
    }

    newWord = await sanitizeWord(newWord);

    const result = await browser.storage.local.get("words");
    let wordsList = result.words || []; // Create empty array if no words stored yet.

    // Check if new word is already stored.
    if(isDuplicate(newWord, wordsList)) {
        showNotification("Wordnal: Word Already Exists.", newWord);
        return;
    }

    const currentDate = new Date(); // Get current time.

    // Fetch definition. Requires internet connection.
    let allDefs = null;
    try {
        const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord);
        if(response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server.");
        }
        allDefs = await response.json();
    } catch(error) {
        console.error(error);
    }

    let meaningsList = [];

    // At least one definition found.
    if(allDefs && !allDefs.title) {
        allDefs.forEach((wordType) => {
            wordType.meanings.forEach((meaning) => {
                const partOfSpeech = meaning.partOfSpeech;
                meaning.definitions.forEach((d) => {
                    const definition = d.definition;
                    meaningsList.push({
                        part_of_speech: partOfSpeech,
                        definition: definition
                    });
                })
            });
        });
    }

    const newEntry = {
        word: newWord,
        meanings: meaningsList,
        date: currentDate
    };

    // Update stored list of words.
    wordsList.unshift(newEntry);
    const setting = await browser.storage.local.set({ words: wordsList });

    showNotification("Wordnal: Added New Word!", newWord);

}

// Listens when a context menu item is clicked.
browser.contextMenus.onClicked.addListener(async (info, tab) => {

    // Handles "word-selection" context menu item.
    if(info.menuItemId == "word-selection") {
        addWord(info.selectionText);
    }

});


// Handles opening new tab with user's words.
const openDisplayPage = () => {

    const displayPref = {
        url: "index.html",
        active: true,
        openInReaderMode: false
    };

    const displayPage = browser.tabs.create(displayPref);
}

// Listens when the toolbar button is clicked.
browser.browserAction.onClicked.addListener(openDisplayPage);

// Listens when extension page sends a message.
browser.runtime.onMessage.addListener((message, sender) => {
    addWord(message);
});

// Debugging.
const printWords = () => {
    browser.storage.local.get(null, (results) => {
        console.log(results);
    });
}