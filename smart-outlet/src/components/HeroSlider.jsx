import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1920&auto=format&fit=crop',
      title: 'Sound of the <span className="text-blue-500 underline decoration-4 underline-offset-8">Future</span>',
      subtitle: 'Experience spatial audio like never before with our new Pro series.',
      tag: 'New Arrival',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop',
      title: 'Time Redefined <span className="text-blue-500">2026</span>',
      subtitle: 'The perfect blend of elegance and intelligent technology.',
      tag: 'Featured',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1920&auto=format&fit=crop',
      title: 'Ultra Portable <span className="text-blue-500">Power</span>',
      subtitle: 'Work from anywhere with 24-hour battery life and 5G connectivity.',
      tag: 'Best Seller',
    },
  ];

  return (
    <div className="hero-slider h-[500px] md:h-[700px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-8 !h-1 !rounded-full !bg-white/50"></span>`;
          }
        }}
        autoplay={{ delay: 6000 }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full flex items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="container mx-auto px-6 z-10 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                    {slide.tag}
                  </span>
                  <h2 
                    className="text-5xl md:text-8xl font-black mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                  <p className="text-xl md:text-2xl mb-10 text-gray-200 font-medium">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-blue-600/30">
                      Explore Collection
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-bold transition-all border border-white/30">
                      Watch Teaser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="hidden md:block">
          <button className="swiper-button-prev-custom absolute left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="swiper-button-next-custom absolute right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
