import React from 'react';

interface PageHeaderProps {
  eyebrow?: any;
  title?: any;
  subtitle?: any;
  actions?: any;
  variant?: any;
  size?: any;
  onClick?: any;
  to?: any;
}

function PageHeader({ eyebrow, title, subtitle, actions, variant, size, onClick, to }: PageHeaderProps) {
  return (
    <div style={{ padding: 'var(--space-md)' }}>
      <p style={{ color: 'var(--color-text-secondary)' }}>PageHeader</p>
    </div>
  );
}

export default PageHeader;
export { PageHeader };
