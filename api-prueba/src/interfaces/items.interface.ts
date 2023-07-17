export interface Item {
    id: string,
    title: string,
    price: any,
    picture: string,
    condition: string,
    free_shipping: boolean,
    state?: string,
    sold_quantity?: number,
	description?: string,
}