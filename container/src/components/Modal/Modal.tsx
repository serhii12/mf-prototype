import React, { useCallback } from 'react';
import PortalModal from 'react-modal';
import Svg from '@core/components/Svg';
import styles from './Modal.module.scss';

interface ModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  opened: boolean;
  variation?: 'default' | 'small' | 'large';
}

PortalModal.setAppElement('#root');

const Modal: React.FC<ModalProps> = ({
  onClose,
  className,
  opened,
  children,
  variation
}): JSX.Element => {
  /**
   * Handles class variations
   */
  const handleVariation = useCallback((): string => {
    let modalClass = styles.modal__inner;

    if (variation && variation === 'small') {
      modalClass = `${modalClass} ${styles['modal__inner--small']}`;
    } else {
      modalClass = modalClass.replace(styles['modal__inner--small'], '');
    }

    if (variation && variation === 'large') {
      modalClass = `${modalClass} ${styles['modal__inner--large']}`;
    } else {
      modalClass = modalClass.replace(styles['modal__inner--large'], '');
    }

    return modalClass;
  }, [variation]);

  return (
    <PortalModal
      onRequestClose={onClose}
      className={`${styles.modal} ${className}`}
      isOpen={opened}
    >
      <div className={handleVariation()}>
        {onClose && (
          <button type="button" className={styles.modal__close} onClick={onClose}>
            <Svg icon="close" />
          </button>
        )}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </PortalModal>
  );
};

Modal.defaultProps = {
  className: null,
  variation: 'default',
  onClose: () => {}
};

export default Modal;
