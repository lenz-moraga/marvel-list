import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = (props) => {
  const {
    value,
    values,
    searchParameterProp,
    buttonType,
    cssClasses,
    isSubmit,
  } = props;

  const getButtonURL = useCallback(() => {
    switch (buttonType) {
      case 'characterView':
        return `/characters/${values.id}`;

      case 'comicView':
        return `/comics/${values.id}`;

      case 'comicViewAll':
        return '/comics';

      case 'characterViewAll':
        return '/characters';

      case 'search':
        return (
          searchParameterProp &&
          `/search/${searchParameterProp.split('#').join('No.')}`
        );

      default:
        return '#';
    }
  }, [buttonType, values, searchParameterProp]);

  return (
    <Link
      to={getButtonURL()}
      rel="noopener noreferrer"
      className={cssClasses}
      type={isSubmit}
    >
      {value}
    </Link>
  );
};

Button.propTypes = {
  searchParameterProp: PropTypes.string,
  values: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  value: PropTypes.string,
  buttonType: PropTypes.string,
  cssClasses: PropTypes.string,
  isSubmit: PropTypes.string
};

export default Button;
