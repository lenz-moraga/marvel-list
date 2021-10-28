import React, { Fragment } from 'react';

const ImageSection = (props) => {
  const { path, extension, name } = props;

  const renderImage = () => {
    return (
      <img src={`${path}.${extension}`} className="img-thumbnail detail-image" alt={name}></img>
    );
  };

  return <Fragment>{renderImage()}</Fragment>;
};

export default ImageSection;
