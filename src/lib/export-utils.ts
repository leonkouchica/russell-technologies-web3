/**
 * Client-side Data Export Suite for CSV and PDF generation.
 * Enables seamless downloading of formatted CSV spreadsheets and printable PDF reports.
 */

export interface CsvColumn<T> {
  header: string;
  key: keyof T | ((row: T) => any);
}

/**
 * Generates and triggers download of a CSV file from an array of records.
 */
export function exportToCsv<T>(
  filename: string,
  data: T[],
  columns: CsvColumn<T>[],
): void {
  if (!data || data.length === 0) {
    throw new Error("No data available to export");
  }

  const cleanFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`;

  // Build CSV headers
  const headerLine = columns
    .map((col) => `"${String(col.header).replace(/"/g, '""')}"`)
    .join(",");

  // Build CSV rows
  const rows = data.map((row) =>
    columns
      .map((col) => {
        let val: any;
        if (typeof col.key === "function") {
          val = col.key(row);
        } else {
          val = row[col.key];
        }

        if (val === null || val === undefined) {
          return '""';
        }

        // Format dates, arrays, or objects
        if (Array.isArray(val)) {
          val = val.join("; ");
        } else if (typeof val === "object") {
          val = JSON.stringify(val);
        }

        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  // Prepend UTF-8 BOM so Excel opens UTF-8 properly
  const csvContent = "\uFEFF" + [headerLine, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", cleanFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface PdfExportOptions {
  title: string;
  subtitle?: string;
  tableHeaders: string[];
  tableRows: (string | number)[][];
  generatedBy?: string;
}

/**
 * Opens a print-optimized window formatted as a professional PDF report.
 */
export function exportToPdf(options: PdfExportOptions): void {
  const {
    title,
    subtitle = "Official System Export Report",
    tableHeaders,
    tableRows,
    generatedBy = "Russell Technologies Administration",
  } = options;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    throw new Error("Popup blocked. Please allow popups to export PDF.");
  }

  const dateStr = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const headersHtml = tableHeaders
    .map((h) => `<th style="padding: 10px 14px; text-align: left; background: #f8fafc; font-size: 11px; text-transform: uppercase; color: #475569; border-bottom: 2px solid #e2e8f0; font-weight: 700;">${h}</th>`)
    .join("");

  const rowsHtml = tableRows
    .map(
      (row, idx) =>
        `<tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#fcfdfd"}; border-bottom: 1px solid #f1f5f9;">` +
        row
          .map(
            (cell) =>
              `<td style="padding: 10px 14px; font-size: 12px; color: #1e293b; vertical-align: top;">${cell ?? "—"}</td>`,
          )
          .join("") +
        "</tr>",
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} — Export</title>
        <meta charset="utf-8" />
        <style>
          @page { size: A4 landscape; margin: 15mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 24px;
            background: #fff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0062ff;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .logo-text {
            font-size: 20px;
            font-weight: 800;
            color: #0b1328;
            letter-spacing: -0.5px;
          }
          .logo-text span {
            color: #0062ff;
          }
          .title {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-top: 4px;
          }
          .subtitle {
            font-size: 12px;
            color: #64748b;
            margin-top: 2px;
          }
          .meta {
            text-align: right;
            font-size: 11px;
            color: #64748b;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #94a3b8;
          }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 16px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: #1e40af; font-weight: 600;">Print or Save as PDF preview generated.</span>
          <button onclick="window.print()" style="padding: 6px 16px; background: #0062ff; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
            Print / Save to PDF
          </button>
        </div>

        <div class="header">
          <div>
            <div class="logo-text">RUSSELL <span>TECHNOLOGIES</span></div>
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
          <div class="meta">
            <div><strong>Generated:</strong> ${dateStr}</div>
            <div><strong>Total Records:</strong> ${tableRows.length}</div>
            <div><strong>Exported By:</strong> ${generatedBy}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>${headersHtml}</tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="footer">
          <span>Russell Technologies Ltd • Confidential & Proprietary</span>
          <span>russelltechnologies.org</span>
        </div>

        <script>
          // Automatically prompt print dialog after content renders
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
