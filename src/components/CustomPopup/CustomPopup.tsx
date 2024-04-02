import { CustomPopupProps } from "@/types/components.types";
import Popup from "reactjs-popup";


const CustomPopup: React.FC<CustomPopupProps> = ({
  customRef,
  children,
  closeOnDocumentClick = true,
  closeOnEscape = true,
}) => {
  return (
    <Popup
      ref={customRef}
      modal
      nested
      closeOnDocumentClick={closeOnDocumentClick}
      closeOnEscape={closeOnEscape}
    >
      {children}
    </Popup>
  );
};

export default CustomPopup;
