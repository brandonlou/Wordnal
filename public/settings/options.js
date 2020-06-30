const DEFAULT_NAME = "My";
const DEFAULT_COLOR = "#ffffff";
const DEFAULT_NOTIFY = "on";


const restoreOptions = () => {
    const setCurrentChoice = (result) => {
        let options = result.options;
        if(options == undefined) {
            options = {
                name: DEFAULT_NAME,
                color: DEFAULT_COLOR,
                notifications: DEFAULT_NOTIFY
            };
        }
        document.querySelector("#name").value = options.name;
        document.querySelector("#color").value = options.color;
        if(options.notifications == "on") {
            document.querySelector("#on").checked = true;
        } else {
            document.querySelector("#off").checked = true;
        }
    }

    const onError = (error) => {
        console.error(error);
    }

    const getting = browser.storage.local.get("options");
    getting.then(setCurrentChoice, onError);
}


const saveOptions = (e) => {
    e.preventDefault();
    const newName  = document.querySelector("#name").value;
    const newColor = document.querySelector("#color").value;
    const notifyOn = document.querySelector("#on").checked;
    const newNotify = notifyOn ? "on" : "off";
    browser.storage.local.set({ // Change to sync in future.
        options: {
            name: newName,
            color: newColor,
            notifications: newNotify
        }
    });
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);