import * as React from "react";
interface IAlertModal {
    showModal: boolean;
    handleShowModal: Function;
    handleCloseModal: Function;
    heading: string;
    message: string;
    style: string;
    section: string;
    icon: string;
}
declare const AlertModal: React.FC<IAlertModal>;
export default AlertModal;
//# sourceMappingURL=AlertModal.d.ts.map