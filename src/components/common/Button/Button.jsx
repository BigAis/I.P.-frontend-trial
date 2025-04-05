import PropTypes from 'prop-types';
import './Button.scss';

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
  const buttonClassName = `styled-button ${buttonVariant} ${className}`;
  
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