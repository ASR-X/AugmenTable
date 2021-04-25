import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
  },
  dataCaptureView: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '70%',
    height: '70%',
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#006fff",
    marginTop: '5%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalTitle: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 42,
    letterSpacing: 0,
    marginTop: '2%',
    textAlign: 'center',
    marginBottom: '3%'
  },
  modalDescription: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    marginTop: '1%',
    textAlign: 'center',
  },
});