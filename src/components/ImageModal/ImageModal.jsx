import Modal from 'react-modal';
import styles from './ImageModal.module.css'

Modal.setAppElement('#root');

const ImageModal = ({ modalImg, isModalOpen, onCloseModal }) => {
    return (
        <Modal 
           isOpen={isModalOpen} 
           className={styles.modalContent}
           onRequestClose={onCloseModal}
           overlayClassName={styles.modalOverlay}
           shouldCloseOnOverlayClick={true}
        >
            <img className={styles.imgModal} src={modalImg} alt="Enlarged" />
        </Modal>
    )
}

export default ImageModal;