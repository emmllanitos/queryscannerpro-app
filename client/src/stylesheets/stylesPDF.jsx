import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    marginLeft: 12,
    fontFamily: "Oswald",
  },
  text: {
    marginBottom: 12,
    marginLeft: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  boldText: {
    fontWeight: "bold",
  },
  footer: {
    fontSize: 10,
    marginLeft: 12,
    marginTop: 40,
    textAlign: "right",
  },
  contact: {
    fontSize: 10,
    marginLeft: 12,
    marginTop: 12,
    textAlign: "right",
  },
});
