var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DefaultButton } from "@fluentui/react/lib/Button";
import { FontIcon, mergeStyles } from "office-ui-fabric-react";
import * as React from "react";
import { Col, Modal, Row } from "react-bootstrap";
var iconClass = mergeStyles({
    fontSize: 80,
    height: 80,
    width: 80,
    color: "rgb(73, 130, 5)",
    margin: "0 25px",
});
var iconClassError = mergeStyles({
    fontSize: 80,
    height: 80,
    width: 80,
    color: "rgb(226 11 11)",
    margin: "0 25px",
});
var AlertModal = function (props) {
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); })();
    }, []);
    return (React.createElement(Modal, { show: props.showModal, onHide: function () {
            props.handleCloseModal(props.section);
        }, size: "lg" },
        React.createElement(Modal.Header, null,
            React.createElement(Modal.Title, null, props.heading)),
        React.createElement(Modal.Body, { className: "updatemodal", style: { padding: "10px", textAlign: "center" } },
            React.createElement(Row, { className: "rowpadding" },
                React.createElement(Col, { md: 12 },
                    React.createElement(FontIcon, { "aria-label": "Compass", iconName: props.icon, className: props.icon === "SkypeCheck" || props.icon === "SkypeCircleCheck"
                            ? iconClass
                            : iconClassError })),
                React.createElement(Col, { md: 12, style: { marginTop: "10px", marginBottom: "10px" } },
                    React.createElement("div", { className: props.style }, props.message))),
            React.createElement(Row, { className: "buttonsbox rowpadding" },
                React.createElement(DefaultButton, { text: "Close", onClick: function () {
                        props.handleCloseModal(props.section);
                    }, style: { marginTop: "10px" } })))));
};
export default AlertModal;
//# sourceMappingURL=AlertModal.js.map