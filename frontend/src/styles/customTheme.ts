import { experimental_createTheme } from "@clerk/themes";

const baseTheme = {
  variables: {
    colorBackground: "hsl(224 71% 4%)",
    colorText: "hsl(210 20% 98%)",
    colorTextSecondary: "hsl(217.9 10.6% 64.9%)",
    colorPrimary: "hsl(271 57% 58%)",
    colorInputBackground: "hsl(224 71% 4%)",
    colorInputText: "hsl(210 20% 98%)",
    colorDanger: "hsl(0 62.8% 30.6%)",
    borderRadius: "0.5rem",
  },
  elements: {
    card: {
      backgroundColor: "hsl(224 71% 4%)",
      borderColor: "hsl(215 27.9% 16.9%)",
    },
    headerTitle: {
      color: "hsl(210 20% 98%)",
    },
    headerSubtitle: {
      color: "hsl(217.9 10.6% 64.9%)",
    },
    button: {
      backgroundColor: "hsl(224 71% 4%)",
      color: "hsl(210 20% 98%)",
      "&:hover": {
        backgroundColor: "hsl(224 90% 12%)",
        color: "hsl(210 20% 98%)",
      },
    },
    divider: {
      backgroundColor: "hsl(215 27.9% 16.9%)",
    },
    userPreviewMainIdentifier: {
      color: "hsl(210 20% 98%)",
    },
    userPreviewSecondaryIdentifier: {
      color: "hsl(217.9 10.6% 64.9%)",
    },
    userButtonPopoverCard: {
      backgroundColor: "hsl(224 71% 4%)",
      borderColor: "hsl(215 27.9% 16.9%)",
    },
    userButtonPopoverFooter: {
      backgroundColor: "hsl(224 71% 4%)",
      borderColor: "hsl(215 27.9% 16.9%)",
    },
    userButtonPopoverActions: {
      backgroundColor: "hsl(224 71% 4%)",
    },
  },
};

export const customDarkTheme = experimental_createTheme(baseTheme);
