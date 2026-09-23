export const brandColors = {
  navy: "#001847",
  blue: "#0F5EF7",
  blueLight: "#DFEAFF",
  blueTint: "#B5BDE9",
  ash: "#808CA3",
  emerald: "#118B50",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#FF5C8D",
  muted: "#878787",
};

export const radii = {
  sm: "8px",
  md: "12px",
  lg: "16px",
};

export const shadows = {
  soft: "0 8px 20px rgba(0, 24, 71, 0.08)",
  card: "0 10px 30px rgba(15, 94, 247, 0.12)",
};

export const sharedStyles = {
  appShell: {
    backgroundColor: brandColors.white,
    padding: "30px",
    minHeight: "100vh",
  },
  sectionSpacing: {
    paddingTop: "10px",
    paddingBottom: "30px",
  },
  fieldLabel: {
    color: brandColors.navy,
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "0.875rem",
    paddingBottom: "4px",
  },
  iconAction: {
    color: brandColors.ash,
    padding: 0,
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    minWidth: "50px",
    height: "26px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  primaryBadge: {
    background: brandColors.blueLight,
    color: brandColors.blue,
    fontWeight: 700,
    fontSize: "1.25rem",
    lineHeight: "34px",
    padding: "0.625em",
    borderRadius: radii.sm,
    fontFamily: "Nunito",
    fontStyle: "normal",
    textAlign: "center",
  },
};
