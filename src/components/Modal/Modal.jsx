import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

const Modal = props => {
  const { url, alt, onClose } = props;
  const overlayRef = useRef(null);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  const handleBackdropClick = event => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // const { url, alt } = this.props;
  return (
    <div
      className={styles.Overlay}
      onClick={handleBackdropClick}
      ref={overlayRef}
    >
      <div className={styles.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
