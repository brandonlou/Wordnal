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


// Listens when a context menu item is clicked.
browser.contextMenus.onClicked.addListener((info, tab) => {

    // Handles "word-selection" context menu item.
    if(info.menuItemId == "word-selection") {

        const newWord = sanitizeWord(info.selectionText);

        browser.storage.local.get("words", (value) => {
            let wordsList = value.words;
            if(wordsList === undefined) {
                wordsList = [];
            }

            // Check if new word is already stored.
            let duplicateWord = false;
            wordsList.forEach((entry) => {
                if(entry.word == newWord) {
                    duplicateWord = true;
                    return;
                }
            });
            if(duplicateWord) {
                console.log(newWord + "already exists!");
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
                    if(allDefs.title && allDefs.title == "No Definitions Found") {
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

                    wordsList.push(newEntry);

                    browser.storage.local.set({
                        words: wordsList
                    });

                    console.log("Added: " + newWord);

                    // if(showNotifications) {
                    //     showNotification();
                    // }
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

// Shows a notification. Does not work (check my browser settings)...
const showNotification = (title, message) => {
    // browser.notifications.create({
    //     "type": "basic",
    //     "iconUrl": browser.extension.getURL("/icons/icon-48.png"),
    //     "title": "Test title",
    //     "message": "Test message"
    // });
}

// Debugging
const printWords = () => {
    browser.storage.local.get(null, (results) => {
        console.log(results);
    });
}