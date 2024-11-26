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
import { Image, ImageResults } from './DefaultTypes'

import './App.css'

function App() {

  const [images, setImages] = useState<Image[]>([]);
  const [searchTerms, setsearchTerms] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [modalImg, setModalImg] = useState<string | null >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMore, setloadMore] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);

  const onAddSearchParams = (searchparam: string): void => {
    setsearchTerms(searchparam);
    setImages([]);
    setMessage(false)
  }

  const loadMoreBtn = (): void => {
    setPages(prevPages => prevPages + 1);
  }

  const onOpenModal = (imgUrl: string): void => {
    setModalImg(imgUrl);
    setIsModalOpen(true);
  }

  const onCloseModal = (): void => {
    setIsModalOpen(false);
    setModalImg(null);
  }

  useEffect(() => {
    if (searchTerms === null) return;

    const fetchImages = async (): Promise<ImageResults> => { 
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
        { data.total > 20 ? setloadMore(true) : setloadMore(false) };
        
        return data;
      } catch (error) {
        setError(true);
        return { results: [], total: 0, total_pages: 0, error: `${error}` }; 
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
      />)}
      {loading && <Loader />}
      {loadMore && <LoadMoreBtn loadMoreBtn={loadMoreBtn}/>}
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
