import React, {useEffect, useState} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import styles from './Archive.module.scss';

const unique = (arr) => {
  const result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

const Archive = () => {
  const arrayPostsAll = localStorage.getItem('post');
  const [arrayPosts, setArrayPosts] = useState([]);
  const [flagPosts, setFlagPosts] = useState(false);
  const [arrayFilterTags, setArrayFilterTags] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setArrayPosts(arrayPostsAll && arrayPostsAll.length ? JSON.parse(arrayPostsAll) : []);
    setFlagPosts(true);
  }, []);

  useEffect(() => {
    let timeArray = [];
    arrayPosts && arrayPosts.forEach(value => {
      const time = value.tags;
      timeArray = timeArray.concat(time);
    });
    setArrayFilterTags(unique(timeArray));
  }, [flagPosts]);

  const onChange = (value) => {
    setFilter(`#${value}`);
  };
  const onClearFilter = () => {
    setFilter(null);
  }

  useEffect(() => {
    if (filter) {
      setArrayPosts(JSON.parse(arrayPostsAll).filter(item => item.tags.includes(filter)));
    } else {
      setArrayPosts(JSON.parse(arrayPostsAll));
    }
  }, [filter]);
  return (
    <section className={styles.Archive}>
      {filter && (
        <div className={classNames(styles.Archive__blockFilter, 'container')}>
          <h2 className={styles.Archive__titleFilter}>Tags: <span className={styles.Archive__titleSpan}>{filter}</span>
          </h2>
          <button onClick={onClearFilter}>clear filter</button>
          {/*<label htmlFor="tags">Tags</label>*/}
          {/*<select*/}
          {/*  id="tags"*/}
          {/*  onChange={onChange}*/}
          {/*>*/}
          {/*  <option>all</option>*/}
          {/*  {arrayFilterTags.map((value, i) => <option key={i} value={value}>{value}</option>)}*/}
          {/*</select>*/}
        </div>
      )}
      <div className={classNames(styles.Archive__list, 'container')}>
        {arrayPosts && arrayPosts.sort((a, b) => {
          const c = new Date(a.date);
          const d = new Date(b.date);
          return d - c;
        }).map((value, index) => <Cart key={index} onFilter={onChange} {...value}/>)}
      </div>
    </section>
  )
}
export default Archive;

const Cart = ({name, email, date, image, id, comment, onFilter}) => {
  const onClick = (e) => {
    onFilter(e.target.getAttribute('data-value'));
  };

  const renderText = (text) => {
    let parts = text.split(/#(\S*)/)
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = <a key={'link' + i} data-value={parts[i]} onClick={onClick}>#{parts[i]}</a>
    }
    return parts
  };
  const formatTime = new Date(date);

  return (
    <article className={styles.Card}>
      {/*<Link to="/post" onClick={onClick}>*/}
      <img
        className={styles.Card__img}
        src={image}
        alt={name}
      />
      <header className={styles.Card__header}>
        <h2 className={styles.Card__title}>Name: {name}</h2>
        <h4>Email: {email}</h4>
        <h4>Time</h4>
        <time dateTime={date}>
          {`${formatTime.toLocaleTimeString("en-US")} ${formatTime.toLocaleDateString("en-US")}`}
        </time>
        <div className={styles.Card__comment}>
          <h4>Comment</h4>
          {/*{comment.replace(/#(\S*)/g, '<Link href="/post">#$1</Link>')}*/}
          {renderText(comment)}
        </div>
      </header>
      {/*</Link>*/}
    </article>
  )
}

Cart.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  comment: PropTypes.string,
  id: PropTypes.number.isRequired
}
