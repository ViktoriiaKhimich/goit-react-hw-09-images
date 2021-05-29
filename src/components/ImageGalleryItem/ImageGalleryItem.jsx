import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, onClick, largeImageURL, tags }) => {
    return (
        <li className={styles.ImageGalleryItem}>
            <img src={webformatURL} alt={tags} className={styles.ImageGalleryItemImage} onClick={() => onClick(largeImageURL)} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default memo(ImageGalleryItem);