import React, { useEffect, useState } from 'react'
import SearchBoxPage from './SearchBox';
import { Link, useSearchParams } from 'react-router-dom';
import { getItems } from '../api/ItemsApi';
import { getPadDecimals } from '../utils/functions';

const Items = () => {

  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);  

  useEffect(() => {
    const query = searchParams.get('search');
    getResults(query);
  },[searchParams]);

  async function getResults(query) {
    const response = await getItems(query);
    setItems(response.data.items);
  }

  function FreeShipping({freeShipping}) {
    if (freeShipping) {
      return <div className='icono-freeShip'><i className="bi bi-truck"></i></div>
    }
  }

  function Separator({index}) {
    if (index+1 !== items.length) {
      return (<div className='separador'>
                <hr />
              </div>)
    }
  }

  return (
    <div >
      <SearchBoxPage />
      <div className="flex-container-items">
        <div className="elemento-items">
          {items.map((item, index) => (
            <div  key={index}>
              <Link to={`/items/${item.id}`}>
                <div className='item'>
                  <div className='imagen'>
                    <img src={item.picture} alt={item.title} />
                  </div>

                  <div className='title-container'>
                    <div className='precio-icono-container'>
                      <label className='precio'>{`${item.price.currency} ${item.price.amount}.${getPadDecimals(item.price.decimals)}`}</label>
                      <FreeShipping freeShipping = { item.free_shipping }/>              
                    </div>
                    <p className="titulo">{item.title}</p>
                    <label className='condicion'>{(item.condition === "new") ? "Nuevo" : ""}</label>
                  </div>

                  <div className='estado'>
                    <label>{item.state}</label>
                  </div>

                </div>
              </Link>
              <Separator index = { index }/>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Items;