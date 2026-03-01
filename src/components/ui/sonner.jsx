import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-lg p-5 max-w-sm w-full mx-auto bg-white border border-gray-300 shadow-xl group-[.toaster]:bg-background group-[.toaster]:text-blue-600 group-[.toaster]:border-border transition-transform transform group-[.toast]:opacity-100 group-[.toast]:scale-100 group-[.toast]:transition-all group-[.toast]:duration-300",
          description:
            "group-[.toast]:text-blue-600 text-sm font-medium tracking-wide", // Blue text with some letter-spacing for elegance
          actionButton:
            "group-[.toast]:bg-gradient-to-r from-blue-600 to-blue-700 group-[.toast]:text-white font-medium rounded-md py-1.5 px-4 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105", // Action button with gradient and hover effects
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-600 font-medium rounded-md py-1.5 px-4 hover:bg-gray-300 transition-all transform hover:scale-105", // Cancel button with subtle gradient hover
          icon: "group-[.toast]:bg-blue-600 group-[.toast]:text-white rounded-full w-5 h-5 flex items-center justify-center", // Improved icon size and shape
        },
      }}
      {...props} 
    />
  );
};

export { Toaster };
