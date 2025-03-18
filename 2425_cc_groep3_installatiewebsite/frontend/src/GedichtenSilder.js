import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function GedichtenSlider({ gedichten }) {
    if (!gedichten || gedichten.length === 0) {
        return <p style={{ textAlign: "center", color: "white" }}>Gedichten worden geladen...</p>;
    }

    return (
        <div className="gedichten-slider">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {gedichten.map((gedicht, index) => (
                    <SwiperSlide key={index} className="gedicht-slide">
                        <div className="gedicht">
                            <p>{gedicht.tekst}</p>
                            <small>{new Date(gedicht.datum).toLocaleDateString()}</small>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GedichtenSlider;
