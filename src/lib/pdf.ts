export type ReportPdfInput = {
  id: string;
  customer: string;
  address: string;
  completedOn: string;
  technician: string;
  service: string;
  summary: string;
  findings: string;
  productsUsed: string;
};

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function buildServiceReportPdf(report: ReportPdfInput) {
  const lines = [
    "ABC Shield",
    `Service report ${report.id}`,
    `Customer: ${report.customer}`,
    `Property: ${report.address}`,
    `Completed: ${report.completedOn}`,
    `Technician: ${report.technician}`,
    `Service: ${report.service}`,
    `Summary: ${report.summary}`,
    `Findings: ${report.findings}`,
    `Products: ${report.productsUsed}`,
    "This is a demonstration service report.",
  ];

  const stream = lines
    .map((line, index) => {
      const size = index === 0 ? 18 : 11;
      const y = 740 - index * 24;
      return `BT /F1 ${size} Tf 56 ${y} Td (${escapePdfText(line)}) Tj ET`;
    })
    .join("\n");

  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj\n`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += object;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}
