import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./assets/search-icon.png";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import { useMyContext } from "../../Context/Context";

function OrdersDetail() {
  const { setImages } = useMyContext();

  const images = [img1, img2, img3, img4, img5, img6];
  const mainImage = images[0];
  const additionalImages = images.slice(1);

  const handleGalleryClick = () => {
    setImages(additionalImages);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative lg:ml-[260px] px-3 top-[20px]">
        <div className="w-full pb-2">
          <div className="border shadow-sm rounded-lg p-2">
            <div className="">
              <span className="text-[#bdbcc1]">Client Name: </span>
              <span className="font-semibold">Savannah Nguyen</span>
            </div>
            <div className="">
              <span className="text-[#bdbcc1]">Date: </span>
              <span className="font-semibold">October 25, 2019</span>
            </div>
            <div className="pb-5">
              <span className="text-[#bdbcc1]">Location: </span>
              <span className="font-semibold">
                4517 Washington Ave. Manchester, Kentucky 39495
              </span>
            </div>
            <div className="photo-gallery lg:flex gap-x-3">
              <img
                src={mainImage}
                alt="Main"
                className="h-[500px] w-[500px] object-cover rounded-lg mb-2"
              />
              <div className="flex lg:flex-col flex-wrap gap-2">
                {additionalImages.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Additional ${index}`}
                    className="h-[100px] w-[100px] object-cover rounded-lg"
                  />
                ))}
                {additionalImages.length > 3 && (
                  <Link
                    to="/Gallery"
                    onClick={handleGalleryClick}
                    className="h-[100px] w-[100px] flex justify-center items-center bg-gray-200 rounded-lg text-center"
                  >
                    +{additionalImages.length - 3} more
                  </Link>
                )}
              </div>
            </div>
            <div className="">
              <p className="text-black text-xl font-semibold">
                Description:
              </p>
              <p className="text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, excepturi temporibus earum a dignissimos, quidem veniam ea repellendus impedit asperiores provident modi cumque quia. Nulla veritatis cumque enim eos sunt vero quaerat molestias minima incidunt et ea velit, earum libero officiis corrupti asperiores harum delectus modi, perspiciatis illum fugit rerum, consequuntur eius. Velit cum eius, saepe rem veniam quae veritatis consequatur cupiditate, illum natus ipsum nam error fugit fugiat porro nisi maxime odio!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersDetail;
