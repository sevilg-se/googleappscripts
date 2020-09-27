function sendEmailWithPdfAttached() {
  var ssid = SpreadsheetApp.getActiveSpreadsheet().getId();
  var blob = convertToPdf_(ssid);
  sendEmail_(EMAIL_TO,
             blob,
             EMAIL_SUBJECT,
             EMAIL_MESSAGE);
}

function sendEmail_(email, blob, emailSubject, emailMessage) {
    var mailOptions = {
      attachments:blob
    }

    MailApp.sendEmail(
      email, 
      emailSubject,
      emailMessage, 
      mailOptions);
};
