import { Link } from "react-router-dom";
import ReactStars from "react-stars"



const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <Link to={`/product/${product._id}`}>
            <div className=" space-y-4 w-full">
                <div className=" relative bg-secondary0 w-full rounded-md flex items-center justify-center p-10">
                    <img src={product?.images[0]?.url} className="" />
                    {product.discout > 0 && <div className=" absolute left-4 top-4 rounded-md bg-secondary2 text-white px-4 py-1 text-sm">
                        {product.discout}%
                    </div>}
                </div>
                <div>
                    <h1 className="font-semibold">{product.name}</h1>
                    <div className="flex gap-2">
                        <span className=" text-secondary2 font-semibold text-lg">₹{product.discountPrice ? product.discountPrice : product.price}</span>
                        <span className=" text-text2 font-semibold text-lg">{product.discountPrice && `₹${product.price}`}</span>
                    </div>

                    <div className="flex items-center gap-2 -mt-1">
                        <ReactStars size={24} value={product.ratings || 0} edit={false} color2="#FFAD33" />
                        <span className=" text-text2 font-semibold text-lg">({product.numOfReviews})</span>
                    </div>
                </div>
            </div>
        </Link>


    )
}

export default ProductCard
