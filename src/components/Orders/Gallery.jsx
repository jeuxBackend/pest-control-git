import React, { useContext, useState } from "react";
import { useMyContext } from "../../Context/Context";

function Gallery() {
  const { images } = useMyContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative lg:ml-[260px] px-3 top-[20px]">
        <div className="photo-gallery flex flex-wrap gap-x-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="h-[200px] lg:w-1/5 md:1/3 w-full object-cover rounded-lg mb-2 cursor-pointer"
                onClick={() => openModal(image)}
              />
            ))
          ) : (
            <div>No images to display</div>
          )}
        </div>

        {/* Image pop up */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Expanded"
                className="max-w-full max-h-screen"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-600 font-bold text-white w-[30px] h-[30px] rounded-full"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
