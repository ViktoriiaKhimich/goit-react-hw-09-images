import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem'
import styles from './ImageGallery.module.css'

const ImageGallery = ({ images, onClick }) => {
    const imagesElements = images.map(({ id, ...props }) => <ImageGalleryItem key={id} {...props} onClick={onClick} />)
    return (
        <ul className={styles.ImageGallery}>
            {imagesElements}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}
export default ImageGallery;