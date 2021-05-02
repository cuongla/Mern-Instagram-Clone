import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface CarouselProps {
    images: any[]
    id?: string
}

const Carousel: React.FC<CarouselProps> = ({ id, images }) => {
    const { theme } = useSelector((state: RootState) => state);
    const isActive = (index: number) => index === 0 && 'active';

    return (
        <div
            id={`image${id}`}
            className="carousel slide"
            data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    images.map((image, index) => (
                        <div 
                            key={index} 
                            className={`carousel-item ${isActive(index)}`}>
                            <img
                                src={image.url}
                                className="d-block w-100"
                                alt={image.url}
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)'}} />
                        </div>
                    ))
                }
            </div>
            <a
                className="carousel-control-prev"
                role="button"
                data-bs-slide="prev"
                href={`#image${id}`}>
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true">
                </span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                role="button"
                data-bs-slide="next"
                href={`#image${id}`}>
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true">
                </span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    )
}

export default Carousel

