
interface ImageCardProps {
  urlImg: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ urlImg, onClick  }) => {
    return (
        <div>
          <img onClick={onClick} src={urlImg} alt="" />
        </div>
    )
}

export default ImageCard;