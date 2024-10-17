import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"

interface FromToDotTrailsIconProps extends SvgProps {
  numberOfSmallCircles: number
}

const FromToDotTrailsIcon = ({numberOfSmallCircles, ...props}: FromToDotTrailsIconProps) => {
  
  let locationDistanceBig = 6;
  let locationDistanceSmall = locationDistanceBig;

  return (
    <Svg
      width={24}
      height={numberOfSmallCircles == 7 ? 112 : 100}
      fill="none"
      {...props}
    >
      <Circle cx={6} cy={locationDistanceBig} r={6} fill="#7A35B0" />
        {
          Array.from(Array(numberOfSmallCircles + 1), (e, i) => {
            locationDistanceSmall += 12;
            return <Circle key={i} cx={6} cy={locationDistanceSmall} r={2} fill="#7A35B0" />
          })
        }
      <Circle cx={6} cy={locationDistanceSmall + 3} r={6} fill="#7A35B0" />
    </Svg>
  )
}

export default FromToDotTrailsIcon
