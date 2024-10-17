import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MicrophoneIcon = (props: SvgProps) => (
    <Svg
    width={24}
    height={32}
    viewBox="0 0 24 32"
    fill="none"
  >
    <Path
      d="M16.9 6.9a4.9 4.9 0 00-9.8 0V16a4.9 4.9 0 109.8 0V6.9z"
      stroke="#222"
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M1.5 15.3c0 5.8 4.701 10.501 10.5 10.501m0 0c5.8 0 10.5-4.701 10.5-10.5M12 25.8v4.2"
      stroke="#222"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default MicrophoneIcon
