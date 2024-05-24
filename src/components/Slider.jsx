import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import ReactSlider from "react-slick";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Link } from "react-router-dom";

const Slider = () => {
    const setting = useSelector(state => state.ePaper.settings)
    const color = setting?.epaper_sitetheme;
    let sliderRef = useRef(null)

    console.log("Color ==>", color?.primary_color_code);

    useEffect(() => {
        sliderRef.slickPlay();
    }, [])

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div onClick={onClick} className="hidden md:flex absolute z-10 right-4 w-8 h-8 bg-gray-800 rounded-full items-center justify-center">
                <BsChevronRight className="text-white" />
            </div>
        );
    }

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div onClick={onClick} className="hidden md:flex absolute z-10 left-4 w-8 h-8 bg-gray-800 rounded-full items-center justify-center">
                <BsChevronLeft className="text-white" />
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]

    };
    return (
        <ReactSlider ref={slider => (sliderRef = slider)} {...settings} className="flex items-center">
            {[...Array(10)].map((item, i) => (
                <Link key={i} to={`/pdf-view/${i}`} className="shadow border-2 border-slate-300 hover:border-black">
                    <img src={'https://sakfs.sitcdn.com/SAK/2024/05/18/hydFH_MAIN/5_01/73df1928_01_mr.jpg'} alt="slider_image" className={`w-full 'h-40' object-fill`} />
                    <p className={`text-center ${color?.primary_color_code ? '' : 'text-blue-800'} ${color?.secondary_color_code ? '' : 'bg-yellow-500'} text-base font-bold py-1`} style={{ backgroundColor: color?.secondary_color_code ? color?.secondary_color_code : undefined, color: color?.primary_color_code ? color?.primary_color_code : undefined }}>{'Telangana'}</p>
                </Link>
            ))}
        </ReactSlider>
    )
}

export default Slider