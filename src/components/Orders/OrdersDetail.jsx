import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

function OrdersDetail() {
  const { setImages, historyOrderId, setHistoryOrderId } = useMyContext();
  const [orderDetail, setOrderDetail] = useState({});
  const [images, setImagesState] = useState([]);  

  const mainImage = images[0];
  const additionalImages = images.slice(1);

  const handleGalleryClick = () => {
    setImages(additionalImages);
  };

  const getOrderDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`report-by-id/${id}`);
      if (response.data) {
        console.log(response.data);
        setOrderDetail(response.data.report);
    
        const imageUrls = response.data.report.report_image.map(img => img.report_pic);
        setImagesState(imageUrls);  
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getOrderDetail(historyOrderId);
  }, [historyOrderId]);

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
              <span className="font-semibold">{orderDetail.date}</span>
            </div>
            <div className="pb-5">
              <span className="text-[#bdbcc1]">Location: </span>
              <span className="font-semibold">{orderDetail.location}</span>
            </div>
            <div className="photo-gallery lg:flex gap-x-3">
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Main"
                  className="h-[422px] w-[500px] object-cover rounded-lg mb-2"
                />
              )}           
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
              <p className="text-black text-xl font-semibold">Description:</p>
              <p className="text-black">{orderDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersDetail;
