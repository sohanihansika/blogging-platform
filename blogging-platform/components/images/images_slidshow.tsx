'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

import blog1 from '../../assets/blog1.jpg';
import blog2 from '../../assets/blog2.jpg';
import blog3 from '../../assets/blog3.jpg';
import blog4 from '../../assets/blog4.jpg';

import classes from './images_slidshow.module.css';

const images = [blog1, blog2, blog3, blog4];

export default function ImagesSlideshow() {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) => 
                prevIndex < images.length -1? prevIndex+1 : 0
        );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return(
        <div className =  {classes.slideshow}>
            {images.map((img, index) => (
                <Image
                    key ={ index }
                    src = {img}
                    className = {index === currentImgIndex ? classes.active : ''}
                    alt = {`Slideshow Image ${index + 1}`}
                />
            ))}
        </div>
    )
}