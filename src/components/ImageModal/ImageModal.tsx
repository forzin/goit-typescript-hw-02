import Modal from 'react-modal';
import styles from './ImageModal.module.css'

Modal.setAppElement('#root');

interface ImageModalProps {
    modalImg: string | null;
    isModalOpen: boolean;
    onCloseModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalImg, isModalOpen, onCloseModal }) => {
    return (
        <Modal 
           isOpen={isModalOpen} 
           className={styles.modalContent}
           onRequestClose={onCloseModal}
           overlayClassName={styles.modalOverlay}
           shouldCloseOnOverlayClick={true}
        >
            {modalImg && <img className={styles.imgModal} src={modalImg} alt="Enlarged" />}
        </Modal>
    )
}

export default ImageModal;