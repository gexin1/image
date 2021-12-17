import * as React from 'react';
import Image from 'rc-image';
import '../../assets/index.less';

export default function Base() {
  return (
    <div>
      <Image
        src="http://qianfeng.wdai.com/api/u/urlConvertImage?url=https%3A%2F%2Foss.weidai.com.cn%2FQIANFENG%2Fb319366a4444415c819ed4c0b17d3fe2%2Ftmp_e60b2d135a648cbce48d9671445b66853263c9973bf2ac71.jpg&index=%E5%88%98%E6%A6%95&name=0"
        width={200}
        style={{
          marginRight: 24,
        }}
        onClick={() => {
          console.log('click');
        }}
        preview={{
          onVisibleChange: visible => {
            console.log('visible', visible);
          },
        }}
      />

      <Image
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
        width={200}
        style={{
          marginRight: 24,
        }}
        preview={{ mask: 'Click to Preview' }}
      />
      <Image
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ"
        width={200}
        style={{
          marginRight: 24,
        }}
      />
      <Image
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ"
        width={200}
      />

      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        width={200}
        height={100}
      />
    </div>
  );
}
