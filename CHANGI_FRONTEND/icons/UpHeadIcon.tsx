import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const UpHeadIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M23.8 18.2 14 7.8 4.2 18.2"
    />
  </Svg>
)
export default UpHeadIcon
