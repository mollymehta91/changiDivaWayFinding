import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LeftArrowIcon() {
  return (
    <Svg
      width={29}
      height={36}
      viewBox="0 0 29 36"
      fill="none"
    >
      <Path
        d="M.44 13.06a1.5 1.5 0 010-2.12l9.545-9.547a1.5 1.5 0 012.122 2.122L3.62 12l8.486 8.485a1.5 1.5 0 11-2.122 2.122L.44 13.06zM28.5 34a1.5 1.5 0 01-3 0h3zm-27-23.5H20v3H1.5v-3zm27 8.5v15h-3V19h3zM20 10.5a8.5 8.5 0 018.5 8.5h-3a5.5 5.5 0 00-5.5-5.5v-3z"
        fill="#000"
      />
    </Svg>
  )
}

export default LeftArrowIcon
