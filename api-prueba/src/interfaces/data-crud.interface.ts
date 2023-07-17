export interface DataCrudItem {
    id: string,
    title: string,
    price: number,
    condition: string,
    pictures: [{
        url:string,
    }],
    shipping:{
        free_shipping: boolean,
    },
    sold_quantity: number,
    category_id: string,
}

export interface DataCrudItems {
    results: [{
        id: string,
        title: string,
        price: number,
        condition: string,
        thumbnail: string,
        shipping:{
            free_shipping: boolean,
        },
        address:{
            state_name: string,
        },
    }],
}

export interface DataCrudCategories {
    path_from_root: [{
        name: string,
    }],
}

export interface DataCrudDescription {
    plain_text: string,
}

export interface DataCrudPictures {
    url: string,
}