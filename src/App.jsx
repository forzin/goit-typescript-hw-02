import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import MessageInfo from './components/MessageInfo/MessageInfo';

import axios from 'axios';

import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  
  const [images, setImages] = useState(null);
  const [searchTerms, setsearchTerms] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setloadMore] = useState(false);
  const [message, setMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [pages, setPages] = useState(1);

  const onAddSearchParams = (searchparam) => {
    setsearchTerms(searchparam);
    setImages(null);
    setMessage(false)
  }

  const loadMoreBtn = () => {
    setPages(prevPages => prevPages + 1);
  }

  const onOpenModal = (imgUrl) => {
    setModalImg(imgUrl);
    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
    setModalImg(null);
  }

  useEffect(() => {
    if (searchTerms === null) return;

    const fetchImages = async () => { 
      try {
        setLoading(true);
        const { data } = await axios.get('https://api.unsplash.com/search/photos/', {
          params: {
            client_id: 'rmxf8kurd-jZq5uMv4ZOr1LrevnlTERgZJhwAEEmQP4',
            query: searchTerms,
            per_page: 20, 
            page: pages
          }
        });

        setImages(prevImage => pages === 1 ? data.results : [...prevImage, ...data.results]);
        {data.total === 0 && setMessage(true)};
        {data.total > 20 ? setloadMore(true) : setloadMore(false)};

      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchImages();
  }, [searchTerms, pages]);

  useEffect(() => {
    if (images && images.length > 20) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      })
      setLoading(false);
    } 
  }, [images]);

  return (
    <>
      <SearchBar
        onSubmit={onAddSearchParams}
      />
      {message && <MessageInfo />}
      {error ? 
      (<ErrorMessage />) : 
        (<ImageGallery
          images={images}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
      />)}
      {loading && <Loader />}
      {loadMore && <LoadMoreBtn loadMoreBtn={loadMoreBtn}/>}
      <ImageModal/>
      <Toaster />
      <ImageModal 
        modalImg={modalImg}
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      />
    </>
  )
}

export default App
