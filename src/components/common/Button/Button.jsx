// src/components/common/Button/Button.jsx
import PropTypes from 'prop-types';
import './Button.scss';

/**
 * Styled button component with primary and secondary variants
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant ('primary' or 'secondary')
 * @param {ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.type='button'] - Button type ('button', 'submit', or 'reset')
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...restProps
}) => {
  // Valid variants
  const validVariants = ['primary', 'secondary'];
  
  // Ensure variant is valid, default to primary if not
  const buttonVariant = validVariants.includes(variant) ? variant : 'primary';
  
  // Combine classes
  const buttonClassName = `styled-button ${buttonVariant} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;