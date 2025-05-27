# DSA Revision Reminder Bot

This Google Apps Script sends daily Telegram messages with a list of Data Structures and Algorithms (DSA) problems to revise. It pulls revision dates directly from your Google Sheet, making it easy to track and stay consistent with your practice.

---

## 🚀 Features

* Sends **only problems due for revision today**.
* Formats problem names and difficulty using **Markdown** for better readability.
* Automatically ignores empty or irrelevant rows in your sheet.
* Easily customizable to fit your revision schedule.

---

## 🔧 Setup Guide

Follow these steps to get your DSA Revision Reminder Bot up and running:

### 1. Prepare Your Google Sheet

Your spreadsheet needs specific columns to track your problems and revision dates.

* Create a new Google Sheet with the following columns:
    `Date | Problem | Difficulty | 1 Week | 1 Month | 3 Month`.
* Alternatively, you can make a copy of this pre-formatted [DSA Prep Template](https://docs.google.com/spreadsheets/d/1MZLyl7mLjo_lhEBVycvay5-Npu-ylIN_mADjWd6vst4/copy).

---

### 2. Get Telegram Credentials

You'll need a **Bot Token** and your **Chat ID** to allow the bot to send messages to your Telegram account.

#### 🔑 Bot Token

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Type `/start` and then `/newbot`.
3. Follow the prompts to give your bot a name and a username.
4. BotFather will provide a **token** (e.g., `123456789:ABCDefGhIJKlmNOPqrSTUvwxYZ123456789`).
5. **Copy and save this token.** This is your `BOT_TOKEN`.

#### 🆔 Chat ID

To get your `CHAT_ID`, follow these two steps:

**Step 1: Start a Chat with Your Bot**

* Go back to Telegram.
* Search for your bot using the username you gave it (e.g., `@my_dsa_reminder_bot`).
* Click **Start** or send any message like `Hi`. This activates your bot and allows it to message you.

**Step 2: Get Your Chat ID**

* Open the following URL in your web browser, replacing `YOUR_BOT_TOKEN` with the token you just received from BotFather:

    ```bash
    [https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates](https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates)
    ```

    For example, if your bot token is `123456:ABC-XYZ`, then go to:

    ```ruby
    [https://api.telegram.org/bot123456:ABC-XYZ/getUpdates](https://api.telegram.org/bot123456:ABC-XYZ/getUpdates)
    ```

* You'll see a JSON response. Look for the `id` field within the `chat` object, like this:

    ```json
    {
      "update_id": ...,
      "message": {
        ...,
        "chat": {
          "id": 123456789,
          "first_name": "...",
          ...
        }
      }}
    ```

* Copy the number next to `"id"` (e.g., `123456789`). This is your `CHAT_ID`.

---

### 3. Configure the Google Apps Script

You'll need to update the script with your personal credentials.

1. Open your Google Sheet and go to `Extensions > Apps Script`.
2. Paste the content of your `dsaRevisionReminderBot.gs` file into the Apps Script editor (usually named `Code.gs` by default).
3. **Replace the placeholder variables** in the script with your actual `BOT_TOKEN`, `CHAT_ID`, and your Google Sheet's `SPREADSHEET_ID`.

    ```javascript
    var BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";      // e.g., 123456:ABC-XYZ
    var CHAT_ID = "YOUR_CHAT_ID";                    // e.g., 123456789
    var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";    // Found in your Google Sheet's URL, e.g., [https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit](https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit)
    ```

4. Save the script.

---

### 4. Set a Daily Trigger

Automate your daily reminders by setting up a time-driven trigger.

1. In the Apps Script editor, go to the `Triggers` section (the `⏰` icon on the left sidebar).
2. Click **+ Add Trigger**.
3. Configure the trigger settings:
    * **Function to run:** `sendTelegramRevisions`
    * **Event source:** `Time-driven`
    * **Type of time-based trigger:** Choose how often you want the reminder (e.g., `Day timer`).
    * **Select day of the week** (if applicable) and **Time of day**: Pick a time that suits you (e.g., every day at 8 AM).
4. Save the trigger.

---

## 📸 Example Telegram Message

Here's how your daily DSA revision reminder will look in Telegram, with clear difficulty indicators:

---
### 📅 27-May-2025 — Today's DSA Revisions:

* **Two Sum** — *Easy*
* **Sliding Window** — *Medium*
* **Max Profit** — *Hard*
