import React, { useState, useEffect } from 'react';
import './style.less';
import Swiper from 'swiper';

const Carousel = (props) => {
  const { data = [], containerStyle, imageStyle, direction = 'horizontal', loop = true } = props;
  const [carousel, setCarousel] = useState(null);
  useEffect(() => {
    if (!carousel && data.length) {
      const swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        direction,
        loop,
      });
      setCarousel(swiper);
    }
  }, [data.length, carousel]);

  return (
    <div className="swiper-container" style={containerStyle}>
      <div className="swiper-wrapper">
        {
          data.map((item, index) => (
            <div key={item.encodeId + index} className="swiper-slide">
              <img src={item.imageUrl} style={imageStyle} />
            </div>
          ))
        }
      </div>
      <div className="swiper-pagination" />
    </div>
  )
}

export default Carousel;