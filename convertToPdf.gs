function convertToPdf_(spreadsheetId) {
  var spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  spreadsheetId = spreadsheetId ? spreadsheetId : spreadsheet.getId()  
  var url_base = "docs.google.com/spreadsheets/d/" + spreadsheet.getId() + "/"; 
  var parents = DriveApp.getFileById(spreadsheetId).getParents();
  var folder = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();

  var url_export = 'export?exportFormat=pdf&format=pdf&id=' + spreadsheetId 
      + '&portrait=true' 
      + '&fitw=true'
      + '&size=letter'   
      + '&gridlines=false';
      + '&fzr=false';    

  var options = {
    headers: {
      'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken(),
    }
  }

  var response = UrlFetchApp.fetch(url_base + url_export, options);
  var blob = response.getBlob().setName(pdfName);
  var files = DriveApp.getFilesByName(pdfName);

  while(files.hasNext()) {
    var file = files.next();
    Drive.Files.remove(file.getId())
  }
  
  folder.createFile(blob);
  return blob;
};
