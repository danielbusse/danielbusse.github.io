import Image, { type ImageProps } from 'next/image';

function getImageUrl(src: ImageProps['src']) {
    if (typeof src === 'string') return src;
    return 'default' in src ? src.default.src : src.src;
}

function getWebpUrl(src: ImageProps['src'], webpSrc?: ImageProps['src']) {
    if (webpSrc) return getImageUrl(webpSrc);

    const url = getImageUrl(src);
    return /\.(?:png|jpe?g)(?=([?#]|$))/i.test(url)
        ? url.replace(/\.(?:png|jpe?g)(?=([?#]|$))/i, '.webp')
        : undefined;
}

type OptimizedImageProps = Omit<ImageProps, 'preload' | 'priority'> & {
    webpSrc?: ImageProps['src'];
};

export default function OptimizedImage({ src, webpSrc, alt, ...imageProps }: OptimizedImageProps) {
    const webpUrl = getWebpUrl(src, webpSrc);

    return (
        <picture>
            {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
            <Image src={src} alt={alt} {...imageProps} />
        </picture>
    );
}
