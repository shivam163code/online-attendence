import React from 'react';

const StatCard = ({ label, value, icon: Icon, tone = 'emerald', caption }) => {
  const toneMap = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-300',
    violet: 'from-violet-500/20 to-violet-500/5 text-violet-300',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-300'
  };

  return (
    <div className="surface rounded-3xl p-5 shadow-soft">
      <div className={`inline-flex rounded-2xl bg-gradient-to-br p-3 ${toneMap[tone]}`}>
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </div>
      <div className="mt-5 text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-bold text-white">{value}</div>
      {caption ? <div className="mt-2 text-sm text-slate-400">{caption}</div> : null}
    </div>
  );
};

export default StatCard;
