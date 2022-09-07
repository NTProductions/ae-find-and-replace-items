/** 
 * This script search missing footage items and replaces them if found in a given folder.
 * 
 * 
 * Command to run on Windows (NOTE: Always use full paths!)
 * PowerShell:
 * & "C:\Program Files\Adobe\Adobe After Effects 2022\Support Files\AfterFX.exe" -noui -r "C:\Users\Administrator\Desktop\alert.js"
 * Command Prompt
 * "C:\Program Files\Adobe\Adobe After Effects 2022\Support Files\AfterFX.exe" -noui -ro "C:\Users\Administrator\Desktop\alert.js"
 *
 *
 * On Mac
 * osascript -e 'tell application "Adobe After Effects 2021" to activate' -e 'tell application "Adobe After Effects 2021" to DoScriptFile "/path/to/my script.jsx"'
 * 
 */

function replaceMissingFiles(projectFolder, searchFolderPath) {
    var resFolder = Folder(searchFolderPath);

    for (var i = 1; i <= projectFolder.numItems; i++) {
        if (projectFolder.item(i) instanceof FootageItem) {
            if (projectFolder.item(i).footageMissing === true) {
                findAndReplaceMissingFootage(projectFolder.item(i), resFolder);
            }
        }
    }
};

function findAndReplaceMissingFootage(missingItem, resourceFolder) {
    var searchItems = resourceFolder.getFiles();

    for (var i = 0; i < searchItems.length; i++) {
        if (searchItems[i] instanceof File) {
            if (searchItems[i].fsName.replace(/%20/g, " ").indexOf(missingItem.name.replace(/%20/g, " ")) !== -1) {
                missingItem.replace(searchItems[i]);
            }
        }
    }
    
    // Check for folders, if found any - go into it
    for (var j = 0; j < searchItems.length; j++) {
        if (searchItems.length !== 0 && searchItems[j] instanceof Folder) {
            findAndReplaceMissingFootage(missingItem, searchItems[j]);
        }
    }
};


app.beginUndoGroup("Replacing");
/**
 * Mac path:
 * /Users/erik/Music/template-files/video/story-promo folder/(Footage)
 *
 * Windows path:
 * C:\\Users\\Administrator\\Desktop\\story-promo folder\\(Footage)
  */
replaceMissingFiles(app.project, "C:\\Users\\Administrator\\Desktop\\story-promo folder\\(Footage)");
app.endUndoGroup();
