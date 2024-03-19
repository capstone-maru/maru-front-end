'use client';

import styled from 'styled-components';

const styles = {
  container: styled.div`
    width: 100%;
    padding-right: 96px;
  `,
  section1: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  img: styled.img`
    width: 467px;
    height: 639px;
    flex-shrink: 0;
    object-fit: contain;

    margin-bottom: -96px;
  `,
  description: styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 445px;
    margin-top: 100px;
    h1 {
      color: #000;
      text-align: right;
      font-family: 'Noto Sans KR';
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 32px;
    }
    p {
      color: #000;
      text-align: right;
      font-family: 'Noto Sans KR';
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 104px;
    }
  `,
  loginButtons: styled.div`
    display: flex;
    flex-direction: column;
    gap: 11px;

    button {
      all: unset;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }

    img {
      height: 43px;
      flex-shrink: 0;
      border-radius: 8px;
    }
  `,
  section2: styled.div`
    position: relative;
    left: -240px;
    width: 100dvw;
    height: 500px;
    flex-shrink: 0;
    background: #f7f6f9;
  `,
  section3: styled.div`
    display: flex;
    height: 500px;
    justify-content: flex-end;
    align-items: center;
    padding-right: 213px;
  `,
  imageBox: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 272px;
    height: 656px;
    flex-shrink: 0;
  `,
  boxColumn: styled.div<{ margin: number }>`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: ${({ margin }) => `${margin}px`};
  `,
  box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    flex-shrink: 0;

    border-radius: 16px;
    background: rgba(247, 246, 249, 0.5);
  `,
  section4: styled.div`
    display: flex;
    position: relative;
    left: -240px;
    width: 100dvw;
    height: 287px;
    padding: 161px 619.5px 81px 638.5px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: #f7f6f9;
  `,
  findMateButton: styled.button`
    all: unset;
    padding: 8px 24px;

    border-radius: 8px;
    background: #e15637;

    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
  `,
};

const images = [
  [
    '',
    '',
    '/icon_popular.svg',
    '/icon_hanok.svg',
    '/icon_building.svg',
    '',
    '',
  ],
  [
    '',
    '',
    '/icon_building.svg',
    '/icon_countryside.svg',
    '/icon_camping.svg',
    '',
    '',
  ],
  ['', '', '/icon_house.svg', '/icon_camping.svg', 'icon_hanok.svg', '', ''],
];

export function LandingPage() {
  return (
    <styles.container>
      <styles.section1>
        <styles.img
          alt="Brazuca Date Night"
          src="https://s3-alpha-sig.figma.com/img/cee1/f195/09c0e7edb4b99b5d73a56afd3391e70c?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xl7oUaxM4hm65lINiamHYkCHkdHFXWuzQe8T1uS4T~5VkeQkM3yyJHj5b~ImrqrG8qtnCnUkoVTY-loFtIbkokSJwztdgzyrG3-6LLm4cbZboG31UNoQB04i~4us1xkCeYbsvIQNW2P2ZRJv43mlwfTiy-o8YJQ99N3grve48dne8-2z8f3Mbwt4tQ9SYkUWBfcKGZcy-wDEF-o5~rH4UTcSLJO39tBEIbPzvJkE8~Si1Q0MtkpIUVnoCs1GwyYEBCzNZ~ILPOLBaOL6JU6PkHEuZ8mkcf5vgBrLVzd6OQY5-bBTtpJ51df0YXJ5CUmoTqWB~4b3t1-Sy1uHyEy27g__"
        />
        <styles.description>
          <h1>공동주거생활의 A to Z</h1>
          <p>
            마루에서 여러분만을 위한
            <br /> 메이트를 만나보세요
          </p>
          <styles.loginButtons>
            <button type="button">
              <img
                alt="kakao"
                src="https://s3-alpha-sig.figma.com/img/3d3c/d1f5/021fb8c1c71bbfcfdbd58571b78fafa3?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ij7lN3-5mFIjG4smhXFKW2DLX6yvjrE0DAoSGQp5Gmi9JmVjWgo9WquW6CQOYAeSSNzP8kYDOmRzV2DC88iJ~D3cztENp6zfozg7rcIrDm~v~0EpX4QXCrYJThwRYyNlnLmwciPFwhbX8I4-TmivzhCOBjnE-U1WU-aAF2j~9GWfEio2sGOrh99SldlXU1b6H4Kfue7SlRsQayUGv4ArSFWdNz7y4765V1CE1pdbHmlQaPE2m495WapZDkx0BEkM6IyJo7xzsiXYZFrzIMFgqoWpfALfnIdDoxOb1kIttkhzrDm2eW-oJzZvMnYYSWxMVN7impkHDFDLVBdYSMXxYQ__"
              />
            </button>
            <button type="button">
              <img
                alt="naver"
                src="https://s3-alpha-sig.figma.com/img/bc24/1c57/afda23776f60b331a41aa67a9eaaf66c?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O67VG5oEK~e8y5lWE~bQGfiEUiXHHaQ0yCSIUUXpbWVfdm0amwAK-79zpYT7rKfXymBKwBxth01ywb96VRwakMMkU~1HXxHsBP3UKaGvBJtSi4Z-~uQI9n79t1aQhE4jTZb0u1mzFkJESOiNU9Rj2igRRN-lZ9OH~MBL8O3RjkHzBdy5jwm5xmr3OvSQ7~fIiN0GjzwZ3F3znhjNSufW1g0TErw59DmcLz8lXfGq9qut2ay8eL67~lJJV8fVi8AXuIEyAxfpgtOQl2JyAGiTgVMij-HKWGYQZ1EpNXA89KVPSOPjmF75o281Z8YwOiLtOev6ivUi0wuSGhFkSOq6Pw__"
              />
            </button>
          </styles.loginButtons>
        </styles.description>
      </styles.section1>
      <styles.section2 />
      <styles.section3>
        <styles.imageBox>
          {images.map((column, i) => (
            <styles.boxColumn key={JSON.stringify(column)} margin={16 * i}>
              {column.map(url =>
                url !== '' ? (
                  <styles.box key={url}>
                    <img alt={url} src={url} />
                  </styles.box>
                ) : (
                  <styles.box key={crypto.randomUUID()} />
                ),
              )}
            </styles.boxColumn>
          ))}
        </styles.imageBox>
      </styles.section3>
      <styles.section4>
        <styles.findMateButton>메이트 찾아보기</styles.findMateButton>
      </styles.section4>
    </styles.container>
  );
}
