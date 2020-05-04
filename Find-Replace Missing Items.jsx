function replaceMissingFiles(projectFolderItem, searchFolderPath) {
        var thisFolder = projectFolderItem;
        var resFolder = Folder(searchFolderPath);
        var subFolder, subSubFolder;

            for(var i = 1; i <= thisFolder.numItems; i++) {
                if(thisFolder.item(i) instanceof FootageItem) {
                                if(thisFolder.item(i).footageMissing == true) {
                                findAndReplaceMissingFootage(thisFolder.item(i), resFolder);
                                }
                }
            
    }
}

function findAndReplaceMissingFootage(missingItem, resourceFolder) {
    var foundItem;
    var searchItems =resourceFolder.getFiles();
    for(var i = 0; i < searchItems.length; i++) {
        if(searchItems[i].fsName.replace(/%20/g, " " ).indexOf(missingItem.name.replace(/%20/g, " ")) != -1) {
            missingItem.replace(searchItems[i]);
            }
        }
    }

app.beginUndoGroup("Replacing");
replaceMissingFiles(app.project.item(1), "C:\\Users\\Nate\\Documents\\test");
app.endUndoGroup();