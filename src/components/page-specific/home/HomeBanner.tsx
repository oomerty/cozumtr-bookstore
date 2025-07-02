import { use, useEffect, useState } from "react";

function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imgSrc: "./img/home-campaign-banner-58asd5pd6drt.webp",
      captionHighlight: "25% discount ",
      caption: "all Paulo Coelho books!",
    },
    {
      imgSrc: "./img/home-campaign-banner-58asd5pd6drt.webp",
      caption: "Summer Deals On Childrens Category",
    },
    {
      imgSrc: "./img/home-campaign-banner-58asd5pd6drt.webp",
      caption: "Recent Title",
    },
  ];

  useEffect(function () {
    if (slides?.length > 0) {
      setCurrentSlide(0);
    }
  }, []);

  function handleSlideSwitch(index: number) {
    setCurrentSlide(index);
  }

  return (
    <div className="flex flex-col gap-8">
      {slides.map((slide, index) => (
        <div
          className={`relative bg-gradient-to-l from-indigo-950/20 to-slate-900/70 rounded-lg border border-slate-900/20 ${
            currentSlide !== index && "hidden"
          }`}
          key={index}
        >
          <img src={slide.imgSrc} alt="" />
          <p className="absolute left-8 top-1/4 w-1/3 text-white text-5xl font-semibold leading-16">
            <span className="text-orange-300 font-extrabold">
              {slide.captionHighlight && slide.captionHighlight}
            </span>
            {slide.caption}
          </p>
        </div>
      ))}
      <div className="flex flex-row gap-3 self-center items-center">
        {slides.map((slide, index) => (
          <span
            onClick={() => {
              if (index !== currentSlide) handleSlideSwitch(index);
            }}
            className={` rounded-full transition duration-300 ${
              index === currentSlide
                ? "size-3 bg-orange-500"
                : "size-2.5 bg-slate-900/60"
            }`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeBanner;
