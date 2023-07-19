const products = [
    {title: 'product1', price: '10', currency: '$' },
    {title: 'product2', price: '110', currency: '€‎' },
    {title: 'product3', price: '30', currency: '$' }
]

const addProduct =  (product) => {
    products.push(product)
}

module.exports = {
    products,
    addProduct
}
