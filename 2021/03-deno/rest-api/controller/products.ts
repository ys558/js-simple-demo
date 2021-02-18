import { Product } from '../types.ts';

let products: Product[] = [
    {
        id:'1',
        name: 'product one',
        description: 'this is product 1',
        price: 29.99
    },
    {
        id:'2',
        name: 'product two',
        description: 'this is product 2',
        price: 49.99
    },
    {
        id:'3',
        name: 'product three',
        description: 'this is product 3',
        price: 88.99
    }
]

// @desc Get all products
// @route GET /api/v1/products
export const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

// @desc Get single product
// @route GET /api/v1/products/:id
export const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find( p => p.id === params.id )
    if ( product ) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc Add product
// @route Post /api/v1/product
export const addProduct = ({ response }: { response: any }) => {
    response.body = 'add'
}

// @desc Add product
// @route PUT /api/v1/product/:id
export const updateProduct = ({ response }: { response: any }) => {
    response.body = 'update'
}

// @desc Delete product
// @route DELETE /api/v1/product/:id
export const deleteProduct = ({ response }: { response: any }) => {
    response.body = 'delete'
}