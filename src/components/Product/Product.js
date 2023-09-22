import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductImage from '../ProductImage/ProductImage';
import ProductForm from '../ProductForm/ProductForm';

const Product = ({ colors, sizes, name, title, basePrice }) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);
  const [currentSizeAdditionalPrice, setCurrentSizeAdditionalPrice] = useState(sizes[0].additionalPrice);
  const [currentAddToCardSummary, setCurrentAddToCardSummary] = useState('');
  console.log("Summary", currentAddToCardSummary);

  // Handle button size click
  const handleButtonClick = (index) => {

    // Check if index is in the index range of the products array
    if (index >= 0 && index < sizes.length) {

      // Get the size name and additionalPrice based on the index
      const { name, additionalPrice } = sizes[index];

      // Update states
      setCurrentSize(name);
      setCurrentSizeAdditionalPrice(additionalPrice);
    }
  };

  // Summing the basic price with the optional one
  const getPrice = () => {
    return basePrice += currentSizeAdditionalPrice
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Creating a summary of the product added to the cart
    const summary = `Name: ${name} Size: ${currentSize}, Price: ${basePrice}, Color: ${currentColor}`;

    // Update state
    setCurrentAddToCardSummary((infoSummary) => [...infoSummary, summary]);

  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <ProductImage
          title={title}
          name={name}
          currentColor={currentColor}

        />
      </div>
      <div>
        <header>
          <h2 className={name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice()}$</span>
        </header>
        <ProductForm
          handleSubmit={handleSubmit}
          currentSize={currentSize}
          sizes={sizes}
          handleButtonClick={handleButtonClick}
          colors={colors}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />


      </div>
    </article>
  )
};

Product.propTypes = { props: PropTypes.array };
export default Product;