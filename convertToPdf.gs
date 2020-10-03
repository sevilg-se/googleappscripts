function convertToPdf_(spreadsheetId) {
  var spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  spreadsheetId = spreadsheetId ? spreadsheetId : spreadsheet.getId()  
  var url_base = "docs.google.com/spreadsheets/d/" + spreadsheet.getId() + "/"; 

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
  var blob = response.getBlob().setName(spreadsheet.getName() + '.pdf');
  var file = DriveApp.getFileById(PDF_FILE_ID_TO_UPDATE);
 
  Drive.Files.update({
    title: file.getName(), mimeType: file.getMimeType()
  }, file.getId(), blob);
  return blob;
};
