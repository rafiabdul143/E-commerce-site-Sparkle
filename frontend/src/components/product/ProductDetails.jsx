import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";
import ProductGrid from './ProductGrid';

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket perfect for any occasion",
  brand: "AR-Brand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/536/354?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/536/354?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
  { _id: 1, name: "product_1", price: 100, images: [{ url: "https://picsum.photos/536/354?random=2" }] },
  { _id: 2, name: "product_2", price: 100, images: [{ url: "https://picsum.photos/536/354?random=3" }] },
  { _id: 3, name: "product_3", price: 100, images: [{ url: "https://picsum.photos/536/354?random=4" }] },
  { _id: 4, name: "product_4", price: 100, images: [{ url: "https://picsum.photos/536/354?random=5" }] },
  { _id: 5, name: "product_5", price: 100, images: [{ url: "https://picsum.photos/536/354?random=5" }] },
  { _id: 6, name: "product_6", price: 100, images: [{ url: "https://picsum.photos/536/354?random=41" }] },
  { _id: 7, name: "product_2", price: 100, images: [{ url: "https://picsum.photos/536/354?random=374" }] },
  { _id: 8, name: "product_3", price: 100, images: [{ url: "https://picsum.photos/536/354?random=47457" }] },
  { _id: 9, name: "product_4", price: 100, images: [{ url: "https://picsum.photos/536/354?random=577" }] },
  { _id: 10, name: "product_5", price: 100, images: [{ url: "https://picsum.photos/536/354?random=517" }] },
 
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [Quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisbled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setProducts(similarProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    } else if (action === "minus") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Choose colour and size before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisbled(true);
    setTimeout(() => {
      toast.success("Product added to cart!", { duration: 1000 });
      setIsButtonDisbled(false);
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Desktop Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `thumbnail ${index}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-[250px] sm:h-[400px] object-cover rounded-lg"
              />
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-scroll space-x-2 sm:space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? 'border-black' : 'border-gray-300'
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-xl sm:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>

            <p className="text-sm sm:text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
            </p>

            <p className="text-base sm:text-xl text-gray-500 mb-2">${selectedProduct.price}</p>

            <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Colors */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm sm:text-base">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border ${
                      selectedColor === color ? "ring-4 ring-offset-1 ring-black" : "border-gray-300"
                    }`}
                    style={{
                      background: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm sm:text-base">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-sm px-3 py-1 sm:px-4 sm:py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700 text-sm sm:text-base">Quantity</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  disabled={Quantity <= 1}
                  className={`text-sm px-2 py-1 rounded transition-all duration-200 ${
                    Quantity <= 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  -
                </button>
                <span className="text-sm sm:text-lg">{Quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`text-sm sm:text-base bg-black text-white py-2 px-4 sm:py-2 sm:px-6 rounded w-full mb-4 ${
                isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding.." : "ADD TO CART"}
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-base sm:text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-xs sm:text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-lg sm:text-2xl text-center font-medium mb-4">You May Also Like.</h2>
          <ProductGrid products={products} isLoading={loading} />
        </div>
      </div>
     
    </div>
  );
};

export default ProductDetails;
 