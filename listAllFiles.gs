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
    sortSheet_();
    convertToPdf_(sheet.getId());
  } catch (e) {
    Logger.log(e.toString());
  }
};

function sortSheet_() {
   var sheet = SpreadsheetApp.getActiveSheet();
   var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
   range.sort({column: 3, ascending: false});
}

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
   var formattedLastUpdated = Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), "dd/MM/yyyy hh:mm")
   var data = [ 
        hyperlink,
        file.getOwner().getName(),
        formattedLastUpdated,
        file.getDescription()
      ];
   sheet.appendRow(data);
};
