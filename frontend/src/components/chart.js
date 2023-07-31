import { useTheme } from "@mui/material/styles";

export const Chart = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      width="76"
      height="31"
      viewBox="0 0 76 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_271_5103)">
        <path
          d="M0.200195 0.737183V30.8426"
          stroke="#B6B6B6"
          stroke-width="0.752635"
          stroke-dasharray="2.26 2.26"
        />
        <mask
          id="mask0_271_5103"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="-3"
          y="9"
          width="81"
          height="32"
        >
          <path
            d="M77.3454 9.01624H-2.05762V40.2506H77.3454V9.01624Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_271_5103)">
          <path
            d="M0.012085 13.5075C3.30487 13.5075 6.12725 21.3611 9.42003 21.3611C12.7128 21.3611 15.5352 14.8164 18.828 14.8164C22.1208 14.8164 24.9431 26.5968 28.2359 26.5968C31.5287 26.5968 34.3511 9.58069 37.6439 9.58069C40.9366 9.58069 43.759 13.5075 47.0518 13.5075C50.3446 13.5075 53.167 10.8896 56.4597 10.8896C59.7525 10.8896 62.5749 27.9057 65.8677 27.9057C69.1605 27.9057 71.9829 23.9789 75.2756 23.9789"
            stroke="url(#paint0_linear_271_5103)"
            stroke-width="1.12895"
          />
        </g>
        <path
          d="M0.200195 30.8427H75.4637"
          stroke="#B6B6B6"
          stroke-width="0.752635"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_271_5103"
          x1="0.012085"
          y1="27.9057"
          x2="75.2756"
          y2="27.9057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#422D70" stop-opacity="0.81" />
          <stop offset="0.98" stop-color="#845ADF" stop-opacity="0.81" />
          <stop offset="1" stop-color="#845ADF" stop-opacity="0.81" />
        </linearGradient>
        <clipPath id="clip0_271_5103">
          <rect
            width="75.2635"
            height="30.1054"
            fill="white"
            transform="translate(0.200195 0.737183)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
