import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import shortid from 'shortid';

const Product = ({ colors, sizes, name, title, basePrice }) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

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
          <span className={styles.price}>Price: {basePrice}$</span>
        </header>
        <form>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>{currentSize}</h3>
            <ul className={styles.choices}>

              {sizes.map(size =>
                <li key={shortid.generate()} value={size}>
                  <button type="button"
                    className={clsx(size.name === currentSize && styles.active)}>{size.name}</button></li>
              )}
            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>
              {colors.map(color =>
                <li key={shortid.generate()} value={color}>
                  <button type="button"
                    className={clsx(prepareColorClassName(color), color === currentColor && styles.active)} />
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