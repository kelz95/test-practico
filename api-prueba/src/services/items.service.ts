import { ParsedQs } from "qs";
import { getDataString } from "./client.service";
import { ResponseItems } from '../interfaces/response.interface';
import { Item } from "../interfaces/items.interface";
import { DataCrudCategories, DataCrudDescription, DataCrudItem, DataCrudItems } from "../interfaces/data-crud.interface";
import { Price } from "../interfaces/price.interface";

const AUTHOR_NAME = process.env.AUTHOR_NAME;
const AUTHOR_LASTNAME = process.env.AUTHOR_LASTNAME;
const HOST_SEARCH_ITEMS = process.env.HOST_SEARCH_ITEMS;
const HOST_GET_ITEM = process.env.HOST_GET_ITEM;
const HOST_GET_CATEGORIES = process.env.HOST_GET_CATEGORIES;


const findItems = async (q: string | ParsedQs | string[] | ParsedQs[]) => {
    const path = HOST_SEARCH_ITEMS + `?q=${q}`;
    const data = getDataString(path).then((data: DataCrudItems) => {
        let response: ResponseItems;    
        let itemsData = [];
        const { results } = data;

        if(results.length){
            for (let i = 0; i < 4; i++) {
                let item: Item;
                const price: Price = getPrice(results[i].price);
                item = {
                    id: results[i].id,
                    title: results[i].title,
                    price: price,
                    condition: results[i].condition,
                    picture: results[i].thumbnail,
                    free_shipping: results[i].shipping.free_shipping,
                    state: results[i].address.state_name,
                }
                itemsData = [ ...itemsData, item ];
            } 
        }      
        response = { ...getAuthor(response), items: itemsData };
        
        const responseString = JSON.stringify(response)
        return  JSON.parse(responseString);
    });

    return data;
}

const findById = async (id: string) => {
    const path = HOST_GET_ITEM + `/${id}`;
    const pathDescripcion = HOST_GET_ITEM + `/${id}/description`;

    const data = getDataString(path).then((data: DataCrudItem) => { 
        const { category_id } = data;
        const pathCategorias = HOST_GET_CATEGORIES + `/${ category_id }`;

        return getDataString(pathDescripcion).then((des: DataCrudDescription) => { 
            const { plain_text } = des;

            return getDataString(pathCategorias).then((cat: DataCrudCategories) => {
                const { path_from_root } = cat;
                
                let response: ResponseItems;
                let catArray: string[] = [];       
                const price: Price = getPrice(data.price);

                if(path_from_root.length){
                    for (let i = 0; i < path_from_root.length; i++) {
                        catArray = [ ...catArray, path_from_root[i].name ];
                    }               
                }
                response = { ...getAuthor(response), categories: catArray, 
                    item: {
                        id: data.id,
                        title: data.title,
                        price: price,
                        condition: data.condition,
                        picture: data.pictures[0].url,
                        free_shipping: data.shipping.free_shipping,
                        sold_quantity: data.sold_quantity,
                        description: plain_text,
                    },
                }

                const responseString = JSON.stringify(response)
                return  JSON.parse(responseString);
            });
        });
    });
    return data;

}

const getAuthor = (objeto: ResponseItems): ResponseItems =>{
    return objeto = {
                author:{
                    name: AUTHOR_NAME,
                    lastname: AUTHOR_LASTNAME
                },
            }
};

const getPrice = (price: number): Price =>{
    const amountString: string = price.toString(); 
    const priceArrayString = amountString.split(".");

    return  {
                currency: '$',
                amount: +priceArrayString[0],
                decimals: (+priceArrayString[1]) || 0,
            }
};

export { findItems, findById }

