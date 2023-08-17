import React from 'react';
import { Snackbar } from '@mui/material';
import styled from 'styled-components';

interface SnackbarButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

interface WishlistSnackbarProps {
    open: boolean;
    onClose: () => void;
    onGoToWishlist: () => void;
}

const StyledSnackbarButton = styled.button`
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const SnackbarButton: React.FC<SnackbarButtonProps> = ({ onClick, children }) => (
    <StyledSnackbarButton color="inherit" onClick={onClick}>
        {children}
    </StyledSnackbarButton>
);


export const WishlistSnackbar: React.FC<WishlistSnackbarProps> = ({ open, onClose, onGoToWishlist }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message="Product added to wishlist"
            action={
                <SnackbarButton onClick={onGoToWishlist}>
                    Go to Wishlist
                </SnackbarButton>
            }
        />
    );
};

export default WishlistSnackbar;
