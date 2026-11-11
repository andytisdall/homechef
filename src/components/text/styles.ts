import { StyleSheet } from "react-native";
import { colors } from "../shiftSignup/styles";

export default StyleSheet.create({
  scrollView: {
    minHeight: "100%",
  },
  sendText: {
    paddingHorizontal: 20,
    backgroundColor: colors.dark,
    flex: 1,
    paddingTop: 30,
  },
  sentSuccess: {
    backgroundColor: colors.green,
    marginTop: 30,
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    borderWidth: 1,
  },
  sendTextVariablesItem: {
    paddingBottom: 30,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 100,
  },
  sendTextLabel: {
    fontSize: 25,
    color: colors.white,
    marginHorizontal: 25,
    letterSpacing: 1.5,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  sendTextInput: {
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 20,
    fontSize: 25,
    padding: 5,
    minHeight: 80,
  },
  sendTextNumberInput: {
    width: 100,
  },
  fridgeSelect: {
    margin: 20,
  },
  fridgeButton: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    width: "100%",
  },
  fridgeInfo: {
    padding: 20,
  },
  fridgeInfoLabel: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 25,
  },
  fridgeInfoValue: {
    fontSize: 22,
    color: colors.white,
  },
  sendTextNav: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  sendTextNavEnd: {
    justifyContent: "flex-end",
  },
  leftArrow: { transform: [{ scaleX: -1 }] },
  sendBtn: {
    margin: 10,
    backgroundColor: colors.red,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.3,
    width: "60%",
    borderRadius: 10,
  },
  sendBtnText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  textPreviewText: {
    fontSize: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.light,
    paddingVertical: 10,
    marginVertical: 25,
    color: colors.yellow,
  },
  textPreviewTitle: {
    fontSize: 30,
    marginBottom: 10,
    color: "white",
  },
  textPreviewRegion: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
  textPreviewBtns: {
    alignItems: "center",
    marginVertical: 10,
  },
  cancel: {
    backgroundColor: colors.grey,
  },
  picker: {
    borderWidth: 1,
    height: 400,
    backgroundColor: "white",
  },
  backBtn: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.light,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
    padding: 20,
  },
  backBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  dropdownContainer: {
    borderBottomWidth: 1,
    backgroundColor: colors.light,
    padding: 5,
  },
  dropdownText: {
    fontWeight: "600",
    fontSize: 20,
  },
  fridgeNotesText: {
    color: "white",
    fontSize: 20,
    marginTop: 15,
  },
  fridgeNotesSubText: { color: "white", marginTop: 15, fontSize: 16 },
  selectedFridgeStyle: {
    backgroundColor: colors.green,
  },
  unselectedFridgeStyle: {
    backgroundColor: "grey",
  },
  setType: {
    alignItems: "center",
  },
  setTypeBtn: {
    backgroundColor: colors.light,
    width: 200,
    margin: 20,
    borderRadius: 10,
  },
  setTypeBtnText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 15,
  },
});
