import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ articles, onImage }) => {
  return (
    <>
      {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={styles.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt="response from API"
            className={styles.ImageGalleryItemImage}
            onClick={() => onImage(largeImageURL, tags, id)}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
