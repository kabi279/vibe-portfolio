// 进入应用即把所有商城商品图预热进浏览器缓存，
// 配合 index.html 的 <link rel="preload"> 实现「一进去就秒显」。
import { mallData } from '../data/mallData';

let started = false;

export function preloadMallImages() {
  if (started) return;
  started = true;
  mallData.forEach((product) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = product.image;
  });
}
