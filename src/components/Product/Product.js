import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import shortid from 'shortid';

const Product = ({ colors, sizes, name, title, basePrice }) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);
  const [currentSizeAdditionalPrice, setCurrentSizeAdditionalPrice] = useState(sizes[0].additionalPrice);

  // Handle button click
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

  const getPrice = () => {
    return basePrice += currentSizeAdditionalPrice
  }

  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
  }

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt={title}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`} />
      </div>
      <div>
        <header>
          <h2 className={name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice()}$</span>
        </header>
        <form>
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