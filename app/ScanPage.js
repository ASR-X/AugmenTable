import React, { Component } from 'react';
import { AppState, BackHandler, Dimensions, SafeAreaView } from 'react-native';

import { requestCameraPermissionsIfNeeded } from './camera-permission-handler';
import BottomSheetSV from './BottomSheetSV';
import { styles, values } from './styles';

import {
  BarcodeTracking,
  BarcodeTrackingAdvancedOverlay,
  BarcodeTrackingBasicOverlay,
  BarcodeTrackingScenario,
  BarcodeTrackingSettings,
  Symbology,
} from 'scandit-react-native-datacapture-barcode';
import {
  Anchor,
  Brush,
  Camera,
  CameraSettings,
  Color,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  MeasureUnit,
  NumberWithUnit,
  PointWithUnit,
  Quadrilateral,
  VideoResolution,
} from 'scandit-react-native-datacapture-core';
import {ARInfo} from './ARInfo';

// Calculate the width of a quadrilateral (barcode location) based on it's corners.
Quadrilateral.prototype.width = function () {
  return Math.max(
    Math.abs(this.topRight.x - this.topLeft.x),
    Math.abs(this.bottomRight.x - this.bottomLeft.x),
  );
};

export class ScanPage extends Component {

  constructor() {
    super();

    // Create data capture context using your license key.
    this.dataCaptureContext = DataCaptureContext.forLicenseKey('AXHf9gJ2IgMNBK0avAbn5FMHc/IuLx5l5DGtffJQxpcUYnRNi201rew3FVCccpbVvGup5XtdcgFcQ8D+CVMab3RLcX/PbYjltgx2eulE1q2kdo+OuhI8N8xAjOsrD+vysEAhbLh+EIhdTob7dx7VSY6sIqnvHnLMV6YkcdqICrhzYtIiz6J26hda/BgFvi/TgA+1VE2cvlWzw/Rk/5SqlYuy4z1NXJqyuGS8eJlSJXvFa5v92zYVld6XPGNM8VJheEtVas8CpHtu5zY4LawhCRh518Nfdjd6+4KQQhtGYdLkfHJ9un/KSOGBe7t3xTXeRKS4pzyYo4P03+WiexCxol6fC/nsoMekrGJ/daPR8wCKTF+5Z0JRgSgXfg0UXW3JkJkGrZY9jibWyG2YyFYEgyxjFR0unOXgbfCKJEVP8U+JHfT+HsPD+RTGfh4oHjZIyjJyblhiESgvl2LcuiT8oVitvl6pXimeiiHVGJ94zg6foQRhxe6LKZ14P1LRJt6L2qg+x4ME6HeoPu4AXxGNG3QTk4/9jc9Dz2fGIkgcZsQWhRVNDfI9fvbJquUXLZQ9/VnzEfAp9coSTwrjmxrTPNjPOpXCkPXGMpK3D+8rPQWKvt5M3bZTg6p0ISSIl77PRTl75kMeXZ8Jz/xaD9JUvxZsIQOnk/u5aFdslYoHrf6XpwNwOnXbsqWSowoUpzJQ2bS8KkS7bM13aEh2cDsmvd50OvPfEbCnScIrt9+4M5sG2CRDKLPId2rDHsqqZ8CvlGdpUEZxlCqpGTiNnXLMidJ/gGXZ7CEAQ4LlCHUsUP3H4xcnFQ==');

    this.viewRef = React.createRef();

    this.trackedBarcodes = {};
    this.state = { scanning: true };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.setupScanning();
    this.startCapture();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.dataCaptureContext.dispose();
  }

  handleAppStateChange = async (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.stopCapture();
    } else if (this.state.scanning) {
      this.startCapture();
    }
  }

  startCapture() {
    this.startCamera();
    this.barcodeTracking.isEnabled = true;
  }

  stopCapture() {
    this.barcodeTracking.isEnabled = false;
    this.stopCamera();
  }

  stopCamera() {
    if (this.camera) {
      this.camera.switchToDesiredState(FrameSourceState.Off);
    }
  }

  startCamera() {
    if (!this.camera) {
      // Use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
      // default and must be turned on to start streaming frames to the data capture context for recognition.
      this.camera = Camera.default;
      this.dataCaptureContext.setFrameSource(this.camera);

      const cameraSettings = new CameraSettings();
      cameraSettings.preferredResolution = VideoResolution.UHD4K;
      this.camera.applySettings(cameraSettings);
    }

    // Switch camera on to start streaming frames and enable the barcode tracking mode.
    // The camera is started asynchronously and will take some time to completely turn on.
    requestCameraPermissionsIfNeeded()
      .then(() => this.camera.switchToDesiredState(FrameSourceState.On))
      .catch(() => BackHandler.exitApp());
  }

  setupScanning() {
    // The barcode tracking process is configured through barcode tracking settings
    // which are then applied to the barcode tracking instance that manages barcode tracking.
    const settings = BarcodeTrackingSettings.forScenario(BarcodeTrackingScenario.A);

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies([
      Symbology.EAN13UPCA,
      Symbology.EAN8,
      Symbology.UPCE,
      Symbology.Code39,
      Symbology.Code128,
    ]);

    // Create new barcode tracking mode with the settings from above.
    this.barcodeTracking = BarcodeTracking.forContext(this.dataCaptureContext, settings);

    // Register a listener to get informed whenever a new barcode is tracked.
    this.barcodeTrackingListener = {
      // This function is called whenever objects are updated and it's the right place to react to the tracking results.
      didUpdateSession: (barcodeTracking, session) => {
        // Remove information about tracked barcodes that are no longer tracked.
        session.removedTrackedBarcodes.forEach((identifier) => {
          this.trackedBarcodes[identifier] = null;
        });

        // Update AR views
        Object.values(session.trackedBarcodes).forEach((trackedBarcode) => {
          this.viewRef.current.viewQuadrilateralForFrameQuadrilateral(trackedBarcode.location)
            .then((location) => this.updateView(trackedBarcode, location));
        });
      },
    };

    this.barcodeTracking.addListener(this.barcodeTrackingListener);

    // Add a barcode tracking overlay to the data capture view to render the tracked barcodes on top of the video
    // preview. This is optional, but recommended for better visual feedback. The overlay is automatically added
    // to the view.
    const basicOverlay = BarcodeTrackingBasicOverlay.withBarcodeTrackingForView(this.barcodeTracking, this.viewRef.current);
    basicOverlay.brush = new Brush(Color.fromHex('FFF0'), Color.fromHex('FFFF'), 2);

    // Add an advanced barcode tracking overlay to the data capture view to render AR visualization on top of
    // the camera preview.
    this.advancedOverlay = BarcodeTrackingAdvancedOverlay.withBarcodeTrackingForView(
      this.barcodeTracking,
      this.viewRef.current,
    );

    this.advancedOverlay.listener = {
      // The offset of our overlay will be calculated from the center anchoring point.
      anchorForTrackedBarcode: () => Anchor.Center,
      // We set the offset's height to be equal of the 100 percent of our overlay.
      // The minus sign means that the overlay will be above the barcode.
      offsetForTrackedBarcode: () => new PointWithUnit(
        new NumberWithUnit(0, MeasureUnit.Fraction),
        new NumberWithUnit(-1, MeasureUnit.Fraction),
      ),
    };
  }

  updateView(trackedBarcode, viewLocation) {
    // If the barcode is wider than the desired percent of the data capture view's width, show it to the user.
    const shouldBeShown = viewLocation.width() > Dimensions.get('window').width * 0.1;

    if (!shouldBeShown) {
      this.trackedBarcodes[trackedBarcode.identifier] = null;
      return;
    }

    const barcodeData = trackedBarcode.barcode.data;

    // The AR view associated with the tracked barcode should only be set again if it was changed,
    // to avoid unnecessarily recreating it.
    const didViewChange = JSON.stringify(this.trackedBarcodes[trackedBarcode.identifier]) !== JSON.stringify(barcodeData);

    if (didViewChange) {
      this.trackedBarcodes[trackedBarcode.identifier] = barcodeData;

      const props = {
        barcodeData,
        // Get the information you want to show from your back end system/database.
        stock: { shelf: 4, backRoom: 8 }
      };

      this.advancedOverlay
        .setViewForTrackedBarcode(new ARInfo(props), trackedBarcode)
        .catch(console.warn);
    }
  }

  render() {
    return (
      <>
        <DataCaptureView style={styles.dataCaptureView} context={this.dataCaptureContext} ref={this.viewRef} />
        <BottomSheetSV />
      </>
    );
  };
}
