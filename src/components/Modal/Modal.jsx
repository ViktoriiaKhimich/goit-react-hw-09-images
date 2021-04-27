import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleBackDropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose()
        }
    }

    render() {
        return createPortal
            (
                <div className={styles.Overlay} onClick={this.handleBackDropClick}>
                    <div className={styles.Modal}>
                        {this.props.children}
                    </div>
                </div>,
                modalRoot,
            );
    }
}

export default Modal;