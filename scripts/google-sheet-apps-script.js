// Google Apps Script example for saving form submissions to a Google Sheet.
// 1) Create a new Apps Script project in Google Sheets.
// 2) Paste this code into it.
// 3) Deploy as a Web App with "Execute as: Me" and "Who has access: Anyone".
// 4) Copy the Web App URL into VITE_FORM_ENDPOINT in your .env file.

const SHEET_NAME = "Enquiries";

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Institute",
      "Phone",
      "City",
      "Courses",
      "Other Course",
      "Challenge",
      "Budget",
      "Start",
      "Role",
      "Website / Instagram",
      "Email",
    ]);
  }

  return sheet;
}

function parsePayload(data) {
  if (!data) return {};

  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return Object.fromEntries(new URLSearchParams(data).entries());
  }
}

function normalize(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value == null ? "" : String(value);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Google Sheet endpoint is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = parsePayload(e && e.postData ? e.postData.contents : "{}");
    const sheet = getSheet();

    const row = [
      new Date(),
      normalize(payload.name),
      normalize(payload.institute),
      normalize(payload.phone),
      normalize(payload.city),
      normalize(payload.courses),
      normalize(payload.otherCourse),
      normalize(payload.challenge),
      normalize(payload.budget),
      normalize(payload.start),
      normalize(payload.role),
      normalize(payload.link),
      normalize(payload.email),
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: "Saved to Google Sheet." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
