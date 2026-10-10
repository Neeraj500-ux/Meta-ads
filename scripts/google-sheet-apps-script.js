// Google Apps Script Web App for the landing page enquiry form.
// Configure the spreadsheet ID and tab name below, authorize access by
// running authorizeSheetAccess once, then deploy as a Web App.

const SPREADSHEET_ID = "1XTbbrrr8UzQO-V0dHcUpgepjRa7Gxgicm2fJscHRk7w";
const SHEET_NAME = "Enquiries";
const HEADERS = [
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
  "Lead Score",
  "Lead Temperature",
  "Total Points",
  "Lead Summary",
  "Lead ID",
  "Stage",
];

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function authorizeSheetAccess() {
  getSheet();
}

function parsePayload(e) {
  const params = (e && e.parameter) || {};
  if (params.payload) {
    return JSON.parse(params.payload);
  }

  const contents = e && e.postData ? e.postData.contents : "";
  if (contents) {
    const contentType = e.postData.type || "";
    if (contentType.indexOf("application/json") !== -1) {
      return JSON.parse(contents);
    }
    if (contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
      const fields = {};
      contents.split("&").forEach(function (pair) {
        const parts = pair.split("=");
        const key = decodeURIComponent((parts.shift() || "").replace(/\+/g, " "));
        const value = decodeURIComponent(parts.join("=").replace(/\+/g, " "));
        if (key) fields[key] = value;
      });
      if (fields.payload) return JSON.parse(fields.payload);
      return fields;
    }
  }

  return params;
}

function normalize(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value == null ? "" : String(value);
}

function jsonpResponse_(callback, result) {
  if (!/^[A-Za-z_$][0-9A-Za-z_$]{0,100}$/.test(callback || "")) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "Invalid verification callback." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    callback + "(" + JSON.stringify(result) + ");"
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.action === "verify") {
    const callback = params.callback || "";
    try {
      const leadId = normalize(params.leadId).trim();
      const expectedStage = normalize(params.stage).trim();
      if (!leadId || !["step1", "complete"].includes(expectedStage)) {
        return jsonpResponse_(callback, {
          ok: false,
          saved: false,
          error: "Verification request is missing a lead ID or valid stage.",
        });
      }

      const sheet = getSheet();
      const lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return jsonpResponse_(callback, {
          ok: true,
          saved: false,
          error: "No enquiry row was found.",
        });
      }

      const records = sheet
        .getRange(2, 18, lastRow - 1, 2)
        .getDisplayValues();
      const record = records.find(function (row) {
        return normalize(row[0]).trim() === leadId;
      });
      const saved = Boolean(record && normalize(record[1]).trim() === expectedStage);
      return jsonpResponse_(callback, {
        ok: true,
        saved: saved,
        error: saved ? "" : "The expected enquiry stage was not saved.",
      });
    } catch (error) {
      return jsonpResponse_(callback, {
        ok: false,
        saved: false,
        error: error.message,
      });
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Google Sheet endpoint is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const payload = parsePayload(e);
    if (
      !payload ||
      !normalize(payload.leadId).trim() ||
      !["step1", "complete"].includes(normalize(payload.stage).trim()) ||
      ![payload.name, payload.institute, payload.phone, payload.city].some(
        function (value) {
          return normalize(value).trim() !== "";
        }
      )
    ) {
      throw new Error("The request did not include lead details.");
    }

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
      normalize(payload.leadScore),
      normalize(payload.leadTemperature),
      normalize(payload.totalPoints),
      normalize(payload.leadSummary),
      normalize(payload.leadId),
      normalize(payload.stage),
    ];

    const leadId = normalize(payload.leadId);
    let existingRow = 0;
    if (leadId && sheet.getLastRow() > 1) {
      const leadIds = sheet
        .getRange(2, HEADERS.indexOf("Lead ID") + 1, sheet.getLastRow() - 1, 1)
        .getValues();
      const matchIndex = leadIds.findIndex(function (values) {
        return normalize(values[0]) === leadId;
      });
      if (matchIndex !== -1) existingRow = matchIndex + 2;
    }

    if (existingRow) {
      row[0] = sheet.getRange(existingRow, 1).getValue() || row[0];
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
    SpreadsheetApp.flush();

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: "Saved to Google Sheet." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}