import { buildServiceReportPdf } from "@/lib/pdf";
import { serviceReports } from "@/lib/portal-data";

type ReportRouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: ReportRouteProps) {
  const { id } = await params;
  const report = serviceReports.find((item) => item.id === id);
  if (!report) {
    return new Response("Report not found", { status: 404 });
  }

  const pdf = buildServiceReportPdf(report);
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.id}.pdf"`,
    },
  });
}
