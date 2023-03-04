import classNames from 'classnames';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

const onErrorHandler = () => {
  const imageElement: HTMLImageElement = document.getElementById('product-hero-image') as HTMLImageElement
  imageElement!.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
}

const onLoadHandler = () => {
  const imageElement: HTMLImageElement = document.getElementById('product-hero-image') as HTMLImageElement
  imageElement!.removeAttribute('onload')
}

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ product, title }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const [imageDataUrl, setImageDataUrl] = useState<string>();

  useEffect(() => {
    if (thumbnailFile == null) {
      return;
    }
    setImageDataUrl(thumbnailFile.filename)
  }, [thumbnailFile]);

  if (imageDataUrl === undefined) {
    return null;
  }

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor to={`/product/${product.id}`}>
              <div className={styles.container()}>
                <AspectRatio ratioHeight={9} ratioWidth={16}>
                  <img id="product-hero-image" className={styles.image()} src={imageDataUrl.split('.').length === 2 ? imageDataUrl.split('.')[0] + '.webp' : imageDataUrl} onError={() => {onErrorHandler()}} onLoad={() => {onLoadHandler()}} loading="lazy" />
                </AspectRatio>

                <div className={styles.overlay()}>
                  <p
                    className={classNames(styles.title(), {
                      [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description(), {
                      [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {product.name}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
}, _.isEqual);

ProductHeroImage.displayName = 'ProductHeroImage';
