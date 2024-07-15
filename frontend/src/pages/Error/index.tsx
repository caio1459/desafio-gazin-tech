import { Image } from 'react-bootstrap';
import image from '/images/page_not_found.png';

export const Error = () => {
  return (
    <>
      <Image src={image} width={1000} height={460} />;
    </>
  )
}