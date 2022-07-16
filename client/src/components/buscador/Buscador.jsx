import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getProductByName } from "../../redux/actions/productName";
import style from './assets/Buscador.module.css';

const Buscador = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [producto, setProducto] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setProducto(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname !== '/products') {
      navigate("/products")
    }
    setTimeout(() => {
      dispatch(getProductByName(producto));
    }, 500);
    setProducto("");
  }

  function isInProducts(e) {
    if (location.pathname !== '/products') {
      return (
        <>
          <Link to={'/products'}>
            <svg onClick={(e) => handleSubmit(e)} className={style.searchIcon} aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </Link>
        </>
      )
    }
    else {
      return (<svg onClick={(e) => handleSubmit(e)} className={style.searchIcon} aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={style.container}>
        <span className={style.search}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={producto}
            onChange={(e) => handleInputChange(e)}
            className={style.inputSearch}
          />
          {isInProducts()}
          {/* <svg onClick={(e) => handleSubmit(e)} className={style.searchIcon} aria-hidden="true" viewBox="0 0 24 24">
          <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg> */}
        </span>
        {/* <button type="submit" onClick={(e) => handleSubmit(e)} className={style.buttonSearch}>
        Buscar
      </button> */}
      </div>
    </form>
  );
};

export default Buscador;
