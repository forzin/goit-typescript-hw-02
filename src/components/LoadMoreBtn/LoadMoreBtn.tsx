interface LoadMoreBtnProps {
  loadMoreBtn: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMoreBtn }) => {
    return (
        <button onClick={loadMoreBtn} type='button'>Show more</button>
    )
}

export default LoadMoreBtn;