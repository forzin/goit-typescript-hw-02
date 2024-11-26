import { nanoid } from "nanoid";
import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGallery.module.css';
import { Image } from "../../DefaultTypes";

interface GalleryListProps {
    images: Image[];
    onOpenModal: (ImageRegular: string) => void;
}

const ImageGallery: React.FC<GalleryListProps> = ({ images, onOpenModal }) => {
    return (
        <ul className={styles.galleryList}>
            {Array.isArray(images) && images.map((image) => {
                return (
                    <li key={nanoid()}>
                        <ImageCard 
                            urlImg={image.urls.small}
                            onClick={():void => onOpenModal(image.urls.regular)}
                        />
	                </li>
                )
            })}
        </ul>
    )
}

export default ImageGallery;