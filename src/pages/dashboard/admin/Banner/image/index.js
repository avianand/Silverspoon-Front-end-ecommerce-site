import React from 'react';
import './index.css';
import { IMAGE_CDN_URL } from '../../../../../_apis_/urls';

function Image(props) {
  return (
    <div style={{ display: 'flex' }}>
      <img className="bannerImage" src={`${IMAGE_CDN_URL.concat(props.image.image)}`} alt="banner" />
    </div>
  );
}

export default Image;
