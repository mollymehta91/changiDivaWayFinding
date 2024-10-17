import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CrossIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m12.495 10 6.983-6.983a1.766 1.766 0 0 0-2.495-2.5L10 7.502 3.017.518a1.767 1.767 0 1 0-2.5 2.499L7.502 10 .518 16.983a1.767 1.767 0 1 0 2.499 2.5L10 12.498l6.983 6.983a1.767 1.767 0 0 0 2.5-2.499L12.494 10Z"
    />
  </Svg>
)
export default CrossIcon
