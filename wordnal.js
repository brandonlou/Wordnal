const showNotifications = true;

// Called when menu item is created. Log success/failure here.
const onCreated = () => {
    if(browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Menu item created successfully!");
    }
}

const printWords = () => {
    browser.storage.local.get(null, (results) => {
        console.log(results);
    });
}

// Create context menu item.
browser.contextMenus.create({
    id: "word-selection",
    title: "Add word to Wordnal",
    contexts: ["selection"]
}, onCreated);

// Listens when a context menu item is clicked.
browser.contextMenus.onClicked.addListener((info, tab) => {

    // Handle "word-selection" context menu item.
    if(info.menuItemId == "word-selection") {
        const newWord = info.selectionText;
        const settingItem = browser.storage.local.set({
            [newWord]: "Test definition",
        });
        console.log("Added: " + newWord);
        if(showNotifications) {
            showNotification();
        }
    }

});

// Event handler to open a new tab showing all words.
const openDisplayPage = () => {

    const displayPref = {
        url: "/display/index.html",
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