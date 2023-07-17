import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoML from '../assets/img/logo-mercado-libre.png';
import { useForm } from "react-hook-form";

const SearchBox = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (register) =>{
        navigate(`/items?search=${ register.query }`);
        reset({query: "" });
    }

    return (
        <div className = "caja">
            <div className="flex-container-header">
                <div className="elemento1">
                    <Link to="/">
                        <img src={logoML} alt="Mercado Libre"/>
                    </Link>
                </div> 
                <div className="elemento2">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                        <input type="text" placeholder="Nunca dejes de buscar" 
                            {...register('query', {required:true})} />
                        <button type="submit" title="Buscar" className="btn" ><i className="bi bi-search"></i></button>
                    </form> 
                </div>                     
            </div>
        </div>
    );
};

export default SearchBox;