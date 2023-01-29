import React from 'react';
import styled from 'styled-components';
import { rem } from '@/client/styled/functions';


interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

const StyledButton = styled.button`
  font-size: ${ rem(20) };
`

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'

  return (
    <StyledButton
      type="button"
      className={ `storybook-button storybook-button--${ size } ${ mode }` }
      style={{ backgroundColor }}
      { ...props }>{ label }
    </StyledButton>
  );
};
