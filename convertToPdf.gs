function convertToPdf_(spreadsheetId) {
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var parents = DriveApp.getFileById(spreadsheetId).getParents();
  var folder = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  var url_base = spreadsheet.getUrl().replace(/edit$/,'');

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
  folder.createFile(blob);
  return blob;
};
