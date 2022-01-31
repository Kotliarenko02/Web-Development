import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';

import styles from './Header.module.scss'
import {Link, NavLink} from "react-router-dom";

const Header = ({menu}) => {
  return (
    <header className={styles.Header}>
      <div className={classNames(styles.Header__block, 'container')}>
        <nav className={styles.Header__nav}>
          <ul className={styles.Header__menuList}>
            {menu.map((value, index) => (
              <ListMenu
                key={index}
                info={value}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.prototype = {
  menu: PropTypes.arrayOf(PropTypes.exact({
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired
};

export default Header;

const ListMenu = ({info, active}) => {
  return (
    <li className={styles.Header__menuList__item}>
      <Link
        to={info.link}
        className={classNames(styles.Header__menuList__item__link)}
      >
        {info.text}
      </Link>
    </li>
  );
};

ListMenu.propTypes = {
  info: PropTypes.exact({
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
}
