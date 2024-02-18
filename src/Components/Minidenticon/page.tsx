import Image from "next/image";
import { useMemo } from "react";
import { minidenticon } from "minidenticons";

interface MinidenticonProps {
    username: string;
    saturation: number;
    lightness: number;
    [key: string]: any;
  }

const Minidenticon: React.FC<MinidenticonProps> = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness]
    );
  
    return <Image src={svgURI} alt={username} {...props} />;
  };
  
  export default Minidenticon;