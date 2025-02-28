import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ImageGallery() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0)

  const product = useSelector((state) => state.products.items);

  let prodById = null;
  for( let x=0;x<product.length;x++) {
    if(product[x].product_id == id){
      prodById = product[x];
      break;
    }
  }
  
  //hold images
  const images = prodById.images || [];


  const handlePrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl border-4 border-gray-100 bg-white shadow-2xl">
      {/* Main Image */}
      <div className="relative aspect-video mb-4">
        <img
          src={`http://localhost:3000${images[selectedImage]}`}
          alt={`Product ${selectedImage + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Navigation Arrows */}
        <button
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-colors duration-200"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <button
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-colors duration-200"
          onClick={handleNext}
          aria-label="Next image"
        >
          <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            className={`flex-shrink-0 border-2 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedImage === index ? "border-blue-500" : "border-gray-200"
              }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`http://localhost:3000${img}`}
              alt={`Gallery thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  )
}