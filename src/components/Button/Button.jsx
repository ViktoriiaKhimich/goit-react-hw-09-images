import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css'

const Button = ({ onClick, children }) => {
    return (
        <button onClick={onClick} type="submit" className={styles.Button}>{children}</button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
}
export default Button;