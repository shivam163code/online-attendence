import React from 'react';

const EmptyState = ({ title, description, action }) => (
  <div className="surface rounded-3xl p-8 text-center">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);

export default EmptyState;
