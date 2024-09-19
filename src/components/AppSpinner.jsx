import colors from 'tailwindcss/colors';
import { number, string } from 'prop-types';
import { memo } from 'react';

const { green } = colors;

AppSpinner.propTypes = {
  color: string,
  size: number,
  duration: number,
};

function AppSpinner({
  color = green[600],
  size = 50,
  duration = 1.2,
  ...restProps
}) {
  return (
    <svg
      role="presentation"
      viewBox="0 0 38 38"
      width={size}
      height={size}
      {...restProps}
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={color} stopOpacity={0} offset="0%" />
          <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={color} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </path>
          <circle fill={color} cx={36} cy={18} r={1}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export default memo(AppSpinner);
