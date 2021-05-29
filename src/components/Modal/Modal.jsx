import React, { useEffect, memo } from 'react';
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ onClose, children }) => {

    useEffect(() => {
        window.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                onClose()
            }
        })
        return window.removeEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                onClose()
            }
        })
    }, [])

    const handleBackDropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return createPortal
        (
            <div className={styles.Overlay} onClick={handleBackDropClick}>
                <div className={styles.Modal}>
                    {children}
                </div>
            </div>,
            modalRoot,
        );

}

export default memo(Modal);