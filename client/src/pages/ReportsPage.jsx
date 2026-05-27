import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';

const ReportsPage = () => {
  const [rows] = useState([
    { label: 'Present', value: 124 },
    { label: 'Absent', value: 14 },
    { label: 'Late', value: 9 }
  ]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Attendance Report', 20, 20);
    rows.forEach((row, index) => {
      doc.text(`${row.label}: ${row.value}`, 20, 40 + index * 10);
    });
    doc.save('attendance-report.pdf');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Reports"
        subtitle="Download attendance summaries as PDF and extend this page with advanced filters, exports, and trend analytics."
        action={<button className="btn-primary" onClick={downloadPdf} type="button"><Download className="h-4 w-4" /> Download PDF</button>}
      />
      <div className="surface rounded-3xl p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-3xl bg-white/5 p-5">
              <div className="text-sm text-slate-400">{row.label}</div>
              <div className="mt-2 text-3xl font-bold text-white">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
