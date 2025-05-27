function sendTelegramRevisions() {
  // 🔒 Replace these with real values
  var BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
  var CHAT_ID = "YOUR_CHAT_ID";
  var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  var data = sheet.getDataRange().getValues();

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), "dd-MMM-yyyy");
  var message = `📅 *${dateStr}* — *Today's DSA Revisions:*\n\n`;
  var count = 0;

  for (var i = 1; i < data.length; i++) {
    var problem = data[i][2]; // Column C
    var difficultyRaw = data[i][3]; // Column D
    var difficulty = difficultyRaw ? difficultyRaw.toString().trim().toLowerCase() : "";

    var difficultyFormatted = "";
    if (difficulty === "easy") difficultyFormatted = "Easy";
    else if (difficulty === "medium") difficultyFormatted = "Medium";
    else if (difficulty === "hard") difficultyFormatted = "Hard";
    else difficultyFormatted = difficulty.charAt(0).toUpperCase() + difficulty.slice(1); // fallback

    var rev1 = data[i][4]; // Column E
    var rev2 = data[i][5]; // Column F
    var rev3 = data[i][6]; // Column G

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
