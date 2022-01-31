import React from "react";
import {useForm} from "react-hook-form";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './FormCat.module.scss'

toast.configure();
const getHashTags = function (string) {
  if (string) {
    let hashTags, i, len, word, words;
    words = string.split(/[\s\r\n]+/);
    hashTags = [];
    for (i = 0, len = words.length; i < len; i++) {
      word = words[i];
      if (word.indexOf('#') === 0) {
        hashTags.push(word);
      }
    }
    return hashTags;
  }
};

const FormCat = () => {

  const {register, handleSubmit,reset, formState: {errors}} = useForm();

  const onSubmit = data => {
    const arrayPost = !!localStorage.getItem('post') ? JSON.parse(localStorage.getItem('post')) : [];
    const image = data.image[0]
    if (image.size > 2000000) {
      alert('you image size is more then 2 Mg')
      return false;
    }

    const id = arrayPost.length ? arrayPost.reduce((number, value) => {
      return number <= value.id ? value.id + 1 : number;
    }, arrayPost[0].id) : 1;

    const reader = new FileReader();
    const tags = getHashTags(data.comment)
    reader.onload = function (e) {
      const info = {
        id,
        name: data.name,
        email: data.email,
        date: new Date(),
        image: reader.result,
        comment: data.comment,
        tags,
      }

      arrayPost.push(info);
      localStorage.setItem('post', JSON.stringify(arrayPost));
      toast.success("Cat add", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
    }

    reader.readAsDataURL(image);
  };
  return (
    <section className={styles.FormCat}>
      <div className="container">
        <form
          className={styles.FormCat__block}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.FormCat__blockInput}>
            <input
              type="file"
              className={styles.FormCat__inputFile}
              accept=".jpg, .jpeg, .png"
              {...register("image", {required: true})}
            />
            {errors.image && <p className={styles.FormCat__error}>This field is Required</p>}
          </div>

          <div className={styles.FormCat__blockInput}>
            <input
              className={styles.FormCat__inputText}
              type="text"
              {...register("name", {
                required: true,
                placeholder: 'author',
                pattern: /^[A-Za-z]+$/i
              })}
            />
            {errors.name && <p className={styles.FormCat__error}>This field is Required</p>}
          </div>

          <div className={styles.FormCat__blockInput}>
            <input
              className={styles.FormCat__inputText}
              type="email" {...register("email", {
              required: true,
              placeholder: 'email'
            })}
            />
            {errors.email && <p className={styles.FormCat__error}>This field is Required</p>}
          </div>

          <div className={styles.FormCat__blockInput}>
            <label htmlFor="comment">Comment</label>
            <textarea
              className={styles.FormCat__inputTextArea}
              {...register("comment", {
                placeholder: 'comment',
                id: 'comment'
              })}
            />
          </div>

          <button
            type="submit"
            className={styles.FormCat__submit}
          >Add post
          </button>
        </form>
      </div>
    </section>
  )
}

export default FormCat;
