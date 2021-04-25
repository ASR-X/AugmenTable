import { StyleSheet } from 'react-native';

export const values = {
  // The card's minimum height.
  cardMinHeight: 125,
  // The header's height.
  headerHeight: 20,
  // Margins for card content - should match cardCornerRadius.
  marginInCard: 22,
  // Radius for the card's top corners.
  cardCornerRadius: 22,
  // Diameter for the <+> button which adds scanned codes to the list.
  barcodesButtonDiameter: 60,
  // Barcode result container height.
  barcodeResultContainerHeight: 56,
}

export const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
  },
  dataCaptureView: {
    flex: 1,
  },
});