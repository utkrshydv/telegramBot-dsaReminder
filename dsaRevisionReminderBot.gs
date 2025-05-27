function sendTelegramRevisions() {
  // 🔒 Replace these with your real values in a local copy
  var BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
  var CHAT_ID = "YOUR_CHAT_ID";
  var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";

  // Open the sheet (assumes first sheet in the spreadsheet)
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  var data = sheet.getDataRange().getValues();

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), "dd-MMM-yyyy");
  var message = `📅 *${dateStr}* — *Today's DSA Revisions:*\n\n`;
  var count = 0;

  for (var i = 1; i < data.length; i++) {
    var problem = data[i][2]; // Column C: Problem
    var difficulty = data[i][3]; // Column D: Difficulty
    var rev1 = data[i][4];    // Column E: 1 Week Rev
    var rev2 = data[i][5];    // Column F: 1 Month Rev
    var rev3 = data[i][6];    // Column G: 3 Month Rev

    // Normalize case
    var difficultyFormatted = difficulty ? difficulty.toString().toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : "";

    // Check if revision date is today
    if (
      (rev1 && new Date(rev1).toDateString() === today.toDateString()) ||
      (rev2 && new Date(rev2).toDateString() === today.toDateString()) ||
      (rev3 && new Date(rev3).toDateString() === today.toDateString())
    ) {
      message += `• *${problem}* — _${difficultyFormatted}_\n`;
      count++;
    }
  }

  if (count > 0) {
    var url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    var payload = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    };

    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    });
  }
}
