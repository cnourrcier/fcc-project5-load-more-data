import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const isMounted = useRef(false);

    async function fetchProducts() {
        try {
            setLoading(true);
            const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${count * 20}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data?.products?.length) {
                setProducts(prevData => [...prevData, ...data.products]);
            }
            setLoading(false);
        } catch (err) {
            setErrorMsg(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        // isMounted ensures that fetchProducts only runs after the component has been mounted, 
        // avoiding redundant fetch calls on the initial render.
        if (isMounted.current) {
            fetchProducts();
        } else {
            isMounted.current = true;
        }
    }, [count])

    useEffect(() => {
        if (products?.length === 100) setDisableButton(true);
    })

    if (loading) {
        return <div>Loading...</div>
    }

    if (errorMsg !== null) {
        return <div>Error occured: {errorMsg}</div>
    }

    return <div className="container">
        <div className='product-container'>
            {
                products?.length
                    ? products.map((product) => (
                        <div key={product.id} className='product'>
                            <p>{product.id}</p>
                            <img src={product.thumbnail} alt={product.title} />
                            <p>{product.title}</p>
                        </div>
                    ))
                    : null
            }
        </div>
        <div className='button-container'>
            {disableButton ? <div>No more products to view</div> : null}
            <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Products</button>
        </div>
    </div>
}