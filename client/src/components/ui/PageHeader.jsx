import React from 'react';

const PageHeader = ({ title, subtitle, action }) => (
  <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Attendance platform</p>
      <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">{subtitle}</p> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

export default PageHeader;
