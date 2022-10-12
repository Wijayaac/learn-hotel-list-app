import debounce from "lodash.debounce";
import React from "react";
import { useForm } from "react-hook-form";

import { getFilteredHotels } from "./Filter.handler";
import style from "./style.module.css";

const Filter = (props) => {
  const { register, handleSubmit, reset, getValues, setValue } = useForm();
  const { setHotels } = props;

  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });
  }

  const onSubmit = (data) => {
    removeEmptyFields(data);
    if (data !== "") {
      getFilteredHotels(data, setHotels);
    }
  };

  const handleReset = () => {
    reset();
    getFilteredHotels("", setHotels);
  };

  const handleSearch = debounce((e) => {
    setValue("name_like", e.target.value);
    let filter = getValues();
    removeEmptyFields(filter);
    getFilteredHotels(filter, setHotels);
  }, 500);

  return (
    <div className={style.filter}>
      <form aria-label='formFilter' onSubmit={handleSubmit(onSubmit)}>
        <div className={style.field}>
          <label htmlFor='name_like'>Name</label>
          <input
            id='name_like'
            aria-label='name'
            {...register("name_like")}
            onChange={handleSearch}
          />
        </div>
        <div className={style.field}>
          <label htmlFor='location'>Location</label>
          <select aria-label='location' id='location' {...register("location")}>
            <option value=''>All</option>
            <option value='Bandung'>Bandung</option>
            <option value='Jakarta'>Jakarta</option>
            <option value='Surabaya'>Surabaya</option>
          </select>
        </div>
        <div className={style.field}>
          <label htmlFor='stars'>Rating</label>
          <select aria-label='star' id='stars' {...register("stars")}>
            <option value=''>All</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <button aria-label='submitButton'>Apply</button>
        <button type='button' onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Filter;
