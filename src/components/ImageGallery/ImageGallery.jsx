import { nanoid } from "nanoid";
import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGallery.module.css';



const ImageGallery = ({ images, onOpenModal }) => {
    

    return (
        <ul className={styles.galleryList}>
            {Array.isArray(images) && images.map((image) => {
                return (
                    <li key={nanoid()}>
                        <ImageCard 
                            urlImg={image.urls.small}
                            onClick={() => onOpenModal(image.urls.regular)}
                        />
	                </li>
                )
            })}
        </ul>
    )
}

export default ImageGallery;