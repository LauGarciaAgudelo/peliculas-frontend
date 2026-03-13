function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="fw-bold">{title}</h2>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </div>
  );
}

import PropTypes from 'prop-types';

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;