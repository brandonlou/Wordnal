# Wordnal

Wordnal is a Firefox extention to save your interesting, quirky, and unusual words encountered on the internet! Wordnal automatically fetches definitions from Google's dictionary, includes editing and sorting features, and has offline functionality to keep your words close to you. Wordnal does not collect any personal data and all words are stored locally on your machine.

## Building
1. `yarn install` to install dependencies.
2. `yarn build` to generate optimized build of project.
3. On Firefox, go to `about:debugging#/runtime/this-firefox`.
4. Click `Load Temporary Add-on...` button.
5. Open `[project root]/build/manifest.json`.

## Todo
* Better icons
* Export to CSV functionality
* Individual word editing and preferred definitions
* Port to Chrome (low priority)