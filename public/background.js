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

// Listens when a context menu item is clicked.
browser.contextMenus.onClicked.addListener(async (info, tab) => {

    // Handles "word-selection" context menu item.
    if(info.menuItemId == "word-selection") {

        const newWord = await sanitizeWord(info.selectionText);

        browser.storage.local.get("words", (value) => {
            let wordsList = value.words;
            if(wordsList === undefined) {
                wordsList = [];
            }

            // Check if new word is already stored.
            if(isDuplicate(newWord, wordsList)) {
                showNotification("Wordnal: Word Already Exists.", newWord);
                return;
            }

            const currentDate = new Date(); // Get current time.

            // Get word definitions. Requires internet connection.
            fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord)
                .then((res) => res.json()) // Convert response to JSON.
                .then((allDefs) => {

                    let newEntry = {
                        word: newWord,
                        date: currentDate
                    };

                    // No definition found.
                    if(allDefs == undefined || allDefs.title == "No Definitions Found") {
                        newEntry.meanings = [];

                    // At least one definition. Parse them all.
                    } else {
                        let meaningsList = [];
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
                        newEntry.meanings = meaningsList;
                    }

                    // Add new word entry to current list of words.
                    wordsList.push(newEntry);

                    // Update stored list of words.
                    browser.storage.local.set({
                        words: wordsList
                    });

                    console.log("Added: " + newWord);
                    showNotification("Wordnal: Added New Word!", newWord);
                })

                // User is offline.
                .catch((err) => {
                    console.error(err);
                })
        });
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

// Debugging
const printWords = () => {
    browser.storage.local.get(null, (results) => {
        console.log(results);
    });
}