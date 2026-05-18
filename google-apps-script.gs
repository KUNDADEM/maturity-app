/**
 * MERAKI DI-AGRO — Registration handler
 *
 * SETUP (do this once, signed in as jonathanoboi14@gmail.com):
 * 1. Go to https://script.google.com  ➜  New project
 * 2. Paste this entire file in Code.gs
 * 3. Create a Google Sheet (in the SAME account) and copy its ID from the URL
 *    https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
 * 4. Paste the ID below in SHEET_ID
 * 5. Deploy ➜ New deployment ➜ Type: Web app
 *      - Execute as: Me (jonathanoboi14@gmail.com)
 *      - Who has access: Anyone
 * 6. Copy the /exec URL and paste it into index.html where it says
 *    `fetch('https://script.google.com/macros/s/.../exec'` (one place).
 *
 * What it does on each submission:
 *  • Appends a row to the Sheet (Timestamp, Name, Farming, Email, Phone)
 *  • Emails the farmer a welcome / confirmation
 *  • Emails YOU (jonathanoboi14@gmail.com) a copy of the registration
 */

const SHEET_ID    = 'PASTE_YOUR_SHEET_ID_HERE';
const SHEET_NAME  = 'Registrations';
const OWNER_EMAIL = 'jonathanoboi14@gmail.com';
const APP_NAME    = 'MERAKI DI-AGRO';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const name    = String(data.name    || '').slice(0, 120);
    const farming = String(data.farming || '').slice(0, 120);
    const email   = String(data.email   || '').slice(0, 200);
    const phone   = String(data.phone   || '').slice(0, 40);

    // 1) Append to sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['Timestamp', 'Full Name', 'Type of Farming', 'Email', 'Contact']);
    }
    sh.appendRow([new Date(), name, farming, email, phone]);

    // 2) Email the farmer
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      MailApp.sendEmail({
        to: email,
        subject: 'Welcome to ' + APP_NAME + ', ' + name.split(' ')[0] + '!',
        htmlBody:
          '<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;background:#f7faf6;border-radius:12px">' +
          '<h2 style="color:#2d5a2d;margin:0 0 8px">🌿 Welcome to ' + APP_NAME + '</h2>' +
          '<p>Hello <b>' + name + '</b>, your farmer account has been created.</p>' +
          '<table style="margin:14px 0;font-size:14px"><tr><td><b>Type of Farming:</b></td><td>&nbsp;' + farming + '</td></tr>' +
          '<tr><td><b>Email:</b></td><td>&nbsp;' + email + '</td></tr>' +
          '<tr><td><b>Contact:</b></td><td>&nbsp;' + phone + '</td></tr></table>' +
          '<p>You can now access weather, market prices, AI advisory and the community feed inside the app.</p>' +
          '<p style="color:#666;font-size:12px">— The ' + APP_NAME + ' Team</p></div>'
      });
    }

    // 3) Notify the owner
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: '[' + APP_NAME + '] New farmer registration: ' + name,
      body:
        'New registration\n\n' +
        'Name: '    + name    + '\n' +
        'Farming: ' + farming + '\n' +
        'Email: '   + email   + '\n' +
        'Contact: ' + phone   + '\n' +
        'When: '    + new Date()
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('MERAKI DI-AGRO endpoint live');
}
