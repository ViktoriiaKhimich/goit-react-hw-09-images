import React from 'react';

import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({webformatURL, onClick}) => {
    return ( 
        <li className={styles.ImageGalleryItem}>
            <img src={webformatURL} alt="" className={styles.ImageGalleryItemImage} onClick={onClick}/>
        </li>
     );
}

export default ImageGalleryItem;