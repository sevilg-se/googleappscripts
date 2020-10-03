function listAllFiles(){
  listFilesInsideOf_(PARENT_FOLDER_ID); 
};

function listFilesInsideOf_(parentFolderId) {
  try {
    var parentFolder = DriveApp.getFolderById(parentFolderId);
    var sheet = SpreadsheetApp.getActiveSheet();
    addHeaders_(sheet);
    listGivenFiles_(parentFolder.getFiles(), sheet)
    listFilesInNestedFolders_(parentFolder, sheet);
    convertToPdf_(sheet.getId());
  } catch (e) {
    Logger.log(e.toString());
  }
};

function addHeaders_(sheet) {
    sheet.clear();
    sheet.appendRow(["File", "Owner", "Last Updated", "Description"]);
}

function listFilesInNestedFolders_(parent, sheet) {
  var nestedFolders = parent.getFolders();
  while (nestedFolders.hasNext()) {
    var nestedFolder = nestedFolders.next();
    listGivenFiles_(nestedFolder.getFiles(), sheet);
    listFilesInNestedFolders_(nestedFolder, sheet);  
  }
};

function listGivenFiles_(files, sheet) {
    while (files.hasNext()) {
      var childFile = files.next();
      writeToSheet_(childFile,sheet);
    }
}

function writeToSheet_(file, sheet) {
   var hyperlink='=hyperlink("' + file.getUrl() + '","' + file.getName() + '")';
   var data = [ 
        hyperlink,
        file.getOwner().getName(),
        file.getLastUpdated(),
        file.getDescription()
      ];
   sheet.appendRow(data);
};
