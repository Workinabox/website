import type { ButtonHTMLAttributes } from 'react';

import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  small?: boolean;
}

const Button = ({
  variant = 'primary',
  small = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const classes = ['btn', variant, small ? 'small' : '', className]
    .filter(Boolean)
    .join(' ');
  return <button type={type} className={classes} {...rest} />;
};

export default Button;
