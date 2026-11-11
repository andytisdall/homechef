import { Dimensions, StyleSheet } from "react-native";
export const colors = {
  beige: "rgb(231, 206, 166)",
  dark: "rgba(6, 79, 134, 1)",
  med: "rgb(44, 104, 183)",
  light: "rgb(161, 194, 241)",
  green: "rgba(53, 223, 81, 1)",
  lightGreen: "rgb(70, 250, 100)",
  yellow: "rgb(255, 255, 181)",
  red: "rgb(200, 70, 70)",
  grey: "rgba(100,100,100,.5)",
  highlight: "rgba(250,250,250, .5)",
  white: "white",
};

const height = Dimensions.get("screen").height;

export default StyleSheet.create({
  scrollView: {
    minHeight: "100%",
  },
  homeChef: {
    backgroundColor: colors.light,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingBottom: 50,
    width: "100%",
  },
  signupMain: {
    paddingTop: 10,
  },
  signupTitle: { fontSize: 25, textAlign: "center" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  switchTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
  },
  switchBtn: { flex: 1, paddingHorizontal: 20 },
  switchText: { textAlign: "center", padding: 5 },
  navBtn: {
    backgroundColor: colors.dark,
    marginBottom: 30,
  },
  navBtnText: {
    padding: 20,
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  viewActive: {
    transform: [{ scale: 1.1 }],
  },
  jobList: { paddingBottom: "20%", height: "100%" },
  jobContainer: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  jobHeader: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  jobName: {
    fontSize: 20,
  },
  jobNameSmall: {
    fontSize: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  shift: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: "center",
  },
  shiftSignupBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
  },
  shiftList: {
    padding: 10,
    paddingBottom: 300,
  },
  location: {
    marginBottom: 20,
    fontSize: 15,
  },
  address: {
    flexDirection: "row",
  },
  signupBtn: {
    backgroundColor: colors.med,
    borderRadius: 10,
  },
  signupBtnText: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontSize: 17,
  },
  jobDate: {
    fontSize: 17,
    width: "35%",
  },

  jobInactiveText: {
    color: colors.grey,
  },
  arrowRotated: {
    transform: [{ rotate: "90deg" }],
  },
  calendarDate: { flex: 1 },
  calendarLink: {
    padding: 2,
    backgroundColor: colors.green,
    flex: 1,
    paddingTop: 15,
  },
  calendarLinkNumber: {
    fontSize: height / 45,
    textAlign: "center",
  },
  calendarLinkText: { fontSize: height / 80, textAlign: "center" },
  calendarLinkInactive: { backgroundColor: colors.grey },
  calendarLinkPressed: { backgroundColor: colors.lightGreen },
  signupDetailInfo: {
    paddingHorizontal: 5,
    marginBottom: 25,
    paddingVertical: 15,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  signupField: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  signupFieldText: { paddingLeft: 10, flexShrink: 1 },
  fullShift: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: colors.grey,
  },
  mealCountInput: {
    fontSize: 20,
    marginLeft: 25,
    width: 75,
    backgroundColor: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: colors.dark,
  },
  checkbox: {
    paddingLeft: 15,
  },
  submitContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  submitBtn: {
    backgroundColor: colors.dark,
    borderRadius: 10,
  },
  submitBtnText: {
    fontWeight: "600",
    padding: 10,
    color: "white",
    fontSize: 18,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  confirmNav: {
    marginTop: 25,
  },
  confirmDetail: {
    marginVertical: 20,
  },
  confirmLabel: {
    fontWeight: "600",
    fontSize: 20,
  },
  confirmText: { fontSize: 18 },
  confirmLine: {
    flexDirection: "column",
    marginVertical: 5,
  },
  highlight: { backgroundColor: colors.highlight },
  invalidDate: {
    backgroundColor: colors.grey,
  },
  calendarContainer: { minHeight: "100%" },
  dateDetailHeader: {
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  mealEntryText: {
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 5,
  },
  signupNotes: {
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },
  regionHeader: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  fridgeInfo: {
    paddingLeft: 15,
    paddingTop: 5,
    borderBottomWidth: 1,
  },
  fridgeList: {
    marginBottom: 10,
  },
  deliverToKitchen: {
    marginLeft: 20,
  },

  confirmText2: {
    fontSize: 18,
    fontStyle: "italic",
  },
  confirmTextHeader: {
    fontSize: 22,
    fontWeight: "600",
  },
  smallBtn: {
    backgroundColor: colors.dark,
    borderRadius: 10,
  },
  smallBtnText: {
    color: "white",
  },
  hour: { marginLeft: 15 },
});
