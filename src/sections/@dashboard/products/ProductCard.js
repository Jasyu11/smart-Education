import PropTypes from 'prop-types';
import React, { useState } from "react";
// @mui
import { Box, Card, Link, Typography, Stack,  Button, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOk = () => {
      setOpen(false);
      console.log({name})
    };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
          <div>
            <button onClick={handleClickOpen}>
              Details
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                {"Pineapple"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Hi, in this course {name} will try to eat you.
                  Do you wanna have a try?
                  Have fun!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button key = "back" onClick={handleClose}>Return</Button>
                <Button key = "Enrol" onClick={handleOk}>Enrol</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
