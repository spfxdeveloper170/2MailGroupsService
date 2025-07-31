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
import * as React from 'react';
import { useEffect, useState } from "react";
import AlertModal from "../../../components/alertModal/AlertModal";
import ServiceUIForm from "../../../components/ServiceUIForm";
//const rootSiteURL = window.location.protocol + "//" + window.location.hostname + "/sites/MCIT-Internal-Services";
var getUserInitials = function (displayName) {
    var names = displayName.trim().split(" ");
    var initials = names.map(function (name) { return name.charAt(0).toUpperCase(); }).join("");
    return initials;
};
var generateGUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var generateUserTitle = function (userProfileAD) { return __awaiter(void 0, void 0, void 0, function () {
    var userInitials, guid, title;
    return __generator(this, function (_a) {
        if (!userProfileAD || !userProfileAD.displayName) {
            throw new Error("User profile information is missing.");
        }
        userInitials = getUserInitials(userProfileAD.displayName);
        guid = generateGUID().substring(0, 8);
        title = "MR-".concat(userInitials, "-").concat(guid);
        console.log("Generated User Title:", title);
        return [2 /*return*/, title];
    });
}); };
var ServiceRequest = function (props) {
    var _a = useState(null), userProfileAD = _a[0], setUserProfileAD = _a[1];
    var _b = useState(true), isLoadingUser = _b[0], setIsLoadingUser = _b[1];
    var _c = useState(false), showModal = _c[0], setShowModal = _c[1];
    var _d = useState(""), modalHeading = _d[0], setModalHeading = _d[1];
    var _e = useState(""), modalMessage = _e[0], setModalMessage = _e[1];
    var _f = useState(""), alertsection = _f[0], setAlertsection = _f[1];
    var _g = useState(""), iconLoad = _g[0], setIconLoad = _g[1];
    var handleShowModal = function () { return setShowModal(true); };
    var handleCloseModal = function (section) {
        setShowModal(false);
    };
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, userAD, userProfile, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, props.context.msGraphClientFactory.getClient("3")];
                    case 1:
                        client = _b.sent();
                        return [4 /*yield*/, client
                                .api("/me")
                                .select("displayName,jobTitle,department,employeeId,mail,onPremisesExtensionAttributes")
                                .get()];
                    case 2:
                        userAD = _b.sent();
                        userProfile = {
                            displayName: userAD.displayName || "",
                            jobTitle: userAD.jobTitle || "",
                            department: userAD.department || "",
                            employeeId: ((_a = userAD === null || userAD === void 0 ? void 0 : userAD.onPremisesExtensionAttributes) === null || _a === void 0 ? void 0 : _a.extensionAttribute15) || ""
                        };
                        setUserProfileAD(userProfile);
                        setIsLoadingUser(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Error fetching user info:", error_1);
                        setIsLoadingUser(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    }, [props]);
    var showErrorModal = function () {
        setModalHeading("Warning");
        setModalMessage("Please fill Required fields");
        setAlertsection("rejected");
        setIconLoad("WarningSolid");
        handleShowModal();
    };
    var saveRequest = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, response, errorText, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log(formData);
                    payload = {
                        attachmentsToDelete: [],
                        attachmentsToUpload: [],
                        parameters: {
                            "par-E08E7EC0B6C6492AB585EAEABD229177": formData.requestedBy,
                            "par-1A7E025815E848079C270DFDF77C1AD4": formData.requestedFor_Title,
                            "par-1A7E025815E848079C270DFDF77C1AD4-recId": formData.requestedFor_key,
                            "par-1D2D1291F1EA415E9DADE0D1B49125A2": formData.serviceName,
                            "par-1D2D1291F1EA415E9DADE0D1B49125A2-recId": formData.serviceName_key,
                            "par-484EDCE1C7784531BB1B501B6E5D3FF8": formData.officeLocation,
                            "par-C6076D8A357545AA8B7E691708DB58FA": formData.PhoneNumber,
                            "par-8ADC459796CE4484A23CFB46AD41CF24": formData.GroupName,
                            "par-FB268B0DDD754BBB938814A4446F9122": formData.UpdatedMailGroupName,
                            "par-FFA0B18C61F4438A91610F43F95F8D05": formData.GroupOwner_Title,
                            "par-FFA0B18C61F4438A91610F43F95F8D05-recId": formData.GroupOwner_key,
                            "par-B43021C22BEF4CD194DC8234C42101B1": formData.Member,
                            "par-B43021C22BEF4CD194DC8234C42101B1-recId": formData.Member_key,
                            "par-9D3B97B6278447C5AC34D708F49F64BF": formData.Member1_Title,
                            "par-8A10089480524EB58505D440CF9C5993": formData.Member2_Title,
                            "par-3374F84E5B244144BD8D17AD27EA71FD": formData.Member3_Title,
                            "par-15AF07CBAE014F468D2EF1593AC3BC3D": formData.Member4_Title,
                            "par-EB636D7E7AE9403AAE96D4B3C1D06D3F": formData.Member5_Title,
                            "par-058CC7FBAB7545578AEA708C2F301B13": formData.Member6_Title,
                            "par-6B69A784061A43B9AA2FC5CFAF373C97": formData.description
                        },
                        delayedFulfill: false,
                        formName: "ServiceReq.ResponsiveAnalyst.DefaultLayout",
                        saveReqState: false,
                        serviceReqData: {
                            Subject: "".concat(props.Subject),
                            Symptom: formData.description,
                            Category: "Calling",
                            CreatedBy: "Ashish",
                            Subcategory: "Access"
                        },
                        subscriptionId: props.subscriptionId
                    };
                    return [4 /*yield*/, fetch("".concat(props.Apilink), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Ocp-Apim-Subscription-Key": "".concat(props.OcpApimKey),
                                "Email": "pmishra@mcit.gov.qa",
                            },
                            body: JSON.stringify(payload)
                        })];
                case 1:
                    response = _a.sent();
                    console.log("response", response);
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    errorText = _a.sent();
                    throw new Error("Request failed: ".concat(response.status, " - ").concat(errorText));
                case 3:
                    setModalHeading("Success");
                    setModalMessage("Your Request has been submitted successfully.");
                    setAlertsection("Accepted");
                    setIconLoad("SkypeCircleCheck");
                    handleShowModal();
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error submitting Request:", error_2);
                    setModalHeading("Error");
                    setModalMessage(error_2.message);
                    setAlertsection("rejected");
                    setIconLoad("ErrorBadge");
                    handleShowModal();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (isLoadingUser) {
        return React.createElement("div", null, "Loading user information...");
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceUIForm, { context: props.context, userprofileAD: userProfileAD, EmpId: (userProfileAD === null || userProfileAD === void 0 ? void 0 : userProfileAD.employeeId) || "", onErrorRequiredFields: function () { return showErrorModal(); }, onSave: function (formData) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, saveRequest(formData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); } }),
        React.createElement(AlertModal, { showModal: showModal, handleShowModal: handleShowModal, handleCloseModal: handleCloseModal, heading: modalHeading, message: modalMessage, style: "", section: alertsection, icon: iconLoad })));
};
export default ServiceRequest;
//# sourceMappingURL=Service.js.map