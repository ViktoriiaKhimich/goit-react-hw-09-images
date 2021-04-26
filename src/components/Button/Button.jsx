import React from 'react';

import styles from './Button.module.css'

// window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: 'smooth',
//   });

const Button = ({onClick, children}) => {
    return (  
        <button onClick={onClick} type="submit" className={styles.Button}>{children}</button>
    );
}
 
export default Button;