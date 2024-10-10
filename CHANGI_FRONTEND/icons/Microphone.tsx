import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Microphone = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M15 2.5a3.75 3.75 0 0 1 3.75 3.75v7.5a3.75 3.75 0 0 1-7.5 0v-7.5A3.75 3.75 0 0 1 15 2.5Zm8.75 11.25c0 4.413-3.262 8.05-7.5 8.663v3.837h-2.5v-3.837c-4.238-.613-7.5-4.25-7.5-8.663h2.5a6.25 6.25 0 1 0 12.5 0h2.5Z"
    />
  </Svg>
)
export default Microphone
