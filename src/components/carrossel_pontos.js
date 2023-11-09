import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carrossel_pontos.css'

const ImageCarouselPontos = () => {
  return (
    <div id='carrossel_ponto'>
        <Carousel showStatus={false}>
            <div>
                <img src="https://c4.wallpaperflare.com/wallpaper/673/190/326/parks-flowers-garden-curitiba-wallpaper-preview.jpg" alt="Imagem 2" />
            </div>
            <div>
                <img src="https://www.prefeituradecuritiba.org/wp-content/uploads/2017/01/curitiba.jpg" alt="Imagem 3" />
            </div>
            <div>
                <img src="https://c4.wallpaperflare.com/wallpaper/455/754/453/curitiba-brazil-parks-city-wallpaper-preview.jpg" alt="Imagem 1" />
            </div>
        </Carousel>
    </div>
  );
};

export default ImageCarouselPontos;
