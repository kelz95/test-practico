import React, { useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import { useParams } from 'react-router-dom';
import { getItem } from '../api/ItemsApi';
import { getPadDecimals } from '../utils/functions';

const ItemDetail = () => {

  const { id } = useParams();
  const [item, setItem] = useState({});
  const [category, setCategories] = useState([]);
  const [price, setPrice] = useState({});
  const [decimals, setDecimals] = useState("");

  useEffect(() => {
    getResults(id);
  }, [id]);

  async function getResults(id) {
    const response = await getItem(id);
    setItem(response.data.item);
    setCategories(response.data.categories);
    setPrice(response.data.item.price);
    const decimalsPad = getPadDecimals(response.data.item.price.decimals);
    setDecimals(decimalsPad);

  }

  function ShowCategoryArrow({ index }) {
    if (index + 1 !== category.length) {
      return <i className="bi bi-chevron-right"></i>
    }
  }

  function FreeShipping({freeShipping}) {
    if (freeShipping) {
      return <label className='label-envio-gratis'>Envío gratis<div className='icono-freeShip'><i className="bi bi-truck"></i></div></label>
    }
  }

  return (
    <div>
      <SearchBox />
      <div className='categorias'>
        {category.map((category, index) => (
          <label key={index}>{category}<ShowCategoryArrow index={index} /> </label>
        ))}
      </div>
      <div className="flex-container-item-detail">
        <div className='details-container'>
          <div className='img-container'>
            <img src={item.picture} width="auto" height="auto" alt={item.title} />
          </div>
          <div className='labels-details'>
            <div className='condition-details'>
              <label>{(item.condition === "new") ? "Nuevo" : ""} - {item.sold_quantity} vendidos</label>
            </div>
            <div className='titulo-details'>
              <p>{item.title}</p>
            </div>
            <div className='price-container'>
              <label className='amount-label'>{`${price.currency} ${price.amount}`}</label>
              <span>{decimals}</span>  
              
            </div>
            <FreeShipping freeShipping = { item.free_shipping }/>     
            <button className="boton-comprar" type='button' title='Comprar'>Comprar</button>
          </div>
        </div>
        <div className='descripcion-container'>
          <label className='titulo-descripcion'>Descripción del producto:</label>
          <p className='texto-descripcion'>{(item.description) ? (item.description) : "Sin información"}</p>
        </div>

      </div>
    </div>
  );
}

export default ItemDetail;