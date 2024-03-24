'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const styles = {
  container: styled.div<{ $imageCount: number }>`
    width: 100%;
    height: 18.75rem;
    border-radius: 16px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 18.75rem;
    gap: 0.5rem;

    .image-grid {
      display: grid;
      height: 18.75rem;

      grid-template-columns: 1fr 1fr;
      grid-template-rows: 9.125rem 9.125rem;
      grid-auto-rows: 18.75rem;
      gap: 0.5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .round-top {
        border-radius: 0 16px 0 0;
      }

      .round-bottom {
        border-radius: 0 0 16px 0;
      }
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      border-radius: 16px 0 0 16px;
    }
  `,
  imageCell: styled.div<{ $url: string }>`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    background-position: center;
    background-size: cover;
    background-image: ${({ $url }) => `url("${$url}")`};
    background-color: ${({ $url }) => ($url === 'none' ? '#c4c4c480' : '')};

    div {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 30%);
      backdrop-filter: blur(0.5rem);
      border-radius: 0 0 16px 0;

      cursor: pointer;
    }
  `,
};

interface Props {
  images: string[];
}

function ImageCell({
  key,
  url,
  className,
  restImageCount,
}: {
  key: string;
  url: string;
  className: string;
  restImageCount: number;
}) {
  const hasOverlay = className.includes('overlay');

  return (
    <styles.imageCell key={key} $url={url} className={className}>
      {hasOverlay && <div>+ {restImageCount}</div>}
    </styles.imageCell>
  );
}

export function ImageGrid({ images: imagesParam }: Props) {
  const [thumbnail] = useState<string | undefined>(imagesParam[0]);
  const [images, setImages] = useState(imagesParam.slice(1, 5));
  const [restImages] = useState<string[]>(imagesParam.slice(5));

  const applyRound = (index: number) => {
    if (index === 1) return 'round-top';
    if (index === 3) return 'round-bottom';
    return '';
  };

  const applyOverlay = (index: number) => {
    if (index === 3 && restImages.length > 0) return 'overlay';
    return '';
  };

  useEffect(() => {
    if (images.length < 4) {
      setImages(
        images.concat(
          Array.from({ length: 4 - images.length }).map(() => 'none'),
        ),
      );
    }
  }, []);

  return (
    <styles.container $imageCount={images.length}>
      <img alt="" src={thumbnail} className="thumbnail" />
      <div className="image-grid">
        {images.map((image, index) =>
          ImageCell({
            key: image,
            url: image,
            className: [applyRound(index), applyOverlay(index)].join(' '),
            restImageCount: restImages.length,
          }),
        )}
      </div>
    </styles.container>
  );
}
