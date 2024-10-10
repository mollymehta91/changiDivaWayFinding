import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SpeakerIcon= (props: SvgProps) => (
  <Svg
    width={8}
    height={8}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M3.702.327a.444.444 0 0 0-.308.144l-1.76 1.99H.308A.308.308 0 0 0 0 2.77v2.462c0 .17.138.307.308.307h1.327l1.75 1.981c.307.308.615.15.615-.269V.701c0-.243-.133-.376-.298-.375v.001Zm2.23.615a.308.308 0 0 0-.066.587A2.757 2.757 0 0 1 7.385 4a2.757 2.757 0 0 1-1.52 2.471.308.308 0 1 0 .27.548A3.383 3.383 0 0 0 8 4C8 2.68 7.24 1.538 6.134.98a.308.308 0 0 0-.172-.038h-.03Zm-.73 1.192a.308.308 0 0 0-.125.577c.475.295.77.763.77 1.289 0 .53-.3 1.003-.78 1.298a.308.308 0 1 0 .327.52C6.031 5.425 6.462 4.761 6.462 4c0-.757-.427-1.426-1.058-1.817a.307.307 0 0 0-.173-.049H5.2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h8v8H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SpeakerIcon
