
const ImageCard = ({ urlImg, onClick  }) => {
    return (
        <div>
          <img onClick={onClick} src={urlImg} alt="" />
        </div>
    )
}

export default ImageCard;