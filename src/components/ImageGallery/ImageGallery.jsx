import { nanoid } from "nanoid";
import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGallery.module.css';



const ImageGallery = ({ images, onOpenModal }) => {
    

    return (
        <ul className={styles.galleryList}>
            {Array.isArray(images) && images.map((image) => {
                return (
                    <li onClick={() => onOpenModal(image.urls.regular)} key={nanoid()}>
                        <ImageCard 
                            urlImg={image.urls.small}
                        />
	                </li>
                )
            })}
        </ul>
    )
}

export default ImageGallery;