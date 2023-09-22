import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import shortid from 'shortid';
import ProductImage from '../ProductImage/ProductImage';

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
  // Preparing the class name
  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
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
        <form onSubmit={handleSubmit}>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>{currentSize}</h3>
            <ul className={styles.choices}>

              {sizes.map((size, index) =>
                <li key={index} value={size}>
                  <button type="button"
                    className={clsx(size.name === currentSize && styles.active)} value={size.name}
                    //clicking the button, we pass the product index to the handleButtonClick function
                    onClick={() => handleButtonClick(index)} >
                    {size.name}
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>
              {colors.map(color =>
                <li key={shortid.generate()} value={color}>
                  <button type="button"
                    className={clsx(prepareColorClassName(color), color === currentColor && styles.active)} value={color} onClick={e => setCurrentColor(e.target.value)} />
                </li>
              )}

            </ul>

          </div>
          <Button className={styles.button}>
            <span className="fa fa-shopping-cart" />
          </Button>
        </form>
      </div>
    </article>
  )
};

Product.propTypes = { props: PropTypes.array };
export default Product;