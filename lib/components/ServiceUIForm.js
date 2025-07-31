var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { useState, useRef } from "react";
import { TextField, PrimaryButton, DefaultButton, Dropdown, DayOfWeek, } from "@fluentui/react";
import "../css/style.css";
import { PeoplePicker, PrincipalType, } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Col } from "react-bootstrap";
var isAr = window.location.pathname.includes("/ar/") ||
    window.location.search.includes("lang=ar");
var ServiceUIForm = function (props) {
    var _a, _b, _c, _d, _e;
    var _f = useState({
        requestedBy: (_a = props.userprofileAD) === null || _a === void 0 ? void 0 : _a.displayName,
        requestedFor: "",
        requestedFor_key: "",
        serviceName: "",
        serviceName_key: "",
        officeLocation: null,
        PhoneNumber: "",
        GroupName: "",
        GroupOwner: "",
        Member: "",
        Member1: "",
        Member2: "",
        Member3: "",
        Member4: "",
        Member5: "",
        Member6: "",
        UpdatedMailGroupName: "",
        files: [],
        description: "",
        Contractdate: null,
        requestedFor_Title: "",
        Member_key: "2AFF75385A554A949681D0AFC942EBD3",
        GroupOwner_Title: "",
        GroupOwner_key: "",
        Member1_Title: "",
        Member2_Title: "",
        Member3_Title: "",
        Member4_Title: "",
        Member5_Title: "",
        Member6_Title: "",
    }), formData = _f[0], setFormData = _f[1];
    var _g = useState([]), uploadedFiles = _g[0], setUploadedFiles = _g[1];
    var _h = useState(""), showErrorUpload = _h[0], setShowErrorUpload = _h[1];
    var _j = useState({}), errors = _j[0], setErrors = _j[1];
    var inputRef = useRef(null);
    var _k = React.useState(DayOfWeek.Sunday), firstDayOfWeek = _k[0], setFirstDayOfWeek = _k[1];
    var _l = useState([]), selectedPeoplePickerProfiles = _l[0], setselectedPeoplePickerProfiles = _l[1];
    var _m = useState(0), setForceUpdater = _m[1];
    var fileInfo;
    function handleInputChange(field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }
    function validateForm() {
        var newErrors = {};
        //if (!formData.requestedBy.trim()) newErrors.requestedBy = isAr ? "مطلوب بواسطة" : "requestedBy is required";
        if (!formData.requestedFor.trim())
            newErrors.requestedFor = isAr
                ? "مطلوب مطلوب"
                : "RequestedFor is required";
        if (!formData.serviceName.trim())
            newErrors.serviceName = isAr
                ? "اسم الخدمة مطلوب"
                : "Service Name is required";
        if (!formData.officeLocation)
            newErrors.officeLocation = isAr ? "الموقع مطلوب" : "Location is required";
        if (!formData.PhoneNumber)
            newErrors.PhoneNumber = isAr
                ? "رقم الهاتف مطلوب"
                : "Phone Number is required";
        if (!formData.GroupName)
            newErrors.GroupName = isAr
                ? "اسم المجموعة مطلوب"
                : "Group Name is required";
        if (formData.serviceName == "New Mail Group Creation") {
            if (!formData.GroupOwner)
                newErrors.GroupOwner = isAr
                    ? "مطلوب مالك المجموعة"
                    : "Group Owner is required";
        }
        if (formData.serviceName == "Update Mail Group Name") {
            if (!formData.UpdatedMailGroupName)
                newErrors.UpdatedMailGroupName = isAr
                    ? "يُطلب تحديث اسم مجموعة البريد"
                    : "Updated Mail Group Name is required";
        }
        if (formData.serviceName != "Update Mail Group Name" &&
            formData.serviceName != "Others") {
            if (!formData.Member)
                newErrors.Member = isAr ? "مطلوب عضو" : "Member is required";
            if (formData.Member >= "1") {
                if (!formData.Member1)
                    newErrors.Member1 = isAr ? "1مطلوب عضو" : "Member1 is required";
            }
            if (formData.Member >= "2") {
                if (!formData.Member2)
                    newErrors.Member2 = isAr ? "2مطلوب عضو" : "Member2 is required";
            }
            if (formData.Member >= "3") {
                if (!formData.Member3)
                    newErrors.Member3 = isAr ? "3مطلوب عضو" : "Member3 is required";
            }
            if (formData.Member >= "4") {
                if (!formData.Member4)
                    newErrors.Member4 = isAr ? "4مطلوب عضو" : "Member4 is required";
            }
            if (formData.Member >= "5") {
                if (!formData.Member5)
                    newErrors.Member5 = isAr ? "5مطلوب عضو" : "Member5 is required";
            }
            if (formData.Member >= "6") {
                if (!formData.Member6)
                    newErrors.Member6 = isAr ? "6مطلوب عضو" : "Member6 is required";
            }
        }
        if (!formData.description)
            newErrors.description = isAr ? "الوصف مطلوب" : "Description is required";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            props.onErrorRequiredFields();
            return false;
        }
        return true;
    }
    function handleSubmit() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //   e.preventDefault();
                        setErrors({});
                        if (!validateForm())
                            return [2 /*return*/];
                        return [4 /*yield*/, props.onSave(formData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var displayName = (_b = props.userprofileAD) === null || _b === void 0 ? void 0 : _b.displayName;
    var initials = "";
    if (displayName && displayName.trim()) {
        var parts = displayName.split(" ");
        initials = parts[0][0] + parts[parts.length - 1][0];
    }
    else {
        initials = "";
    }
    var peoplePickerContext = {
        absoluteUrl: props.context.pageContext.web.absoluteUrl,
        msGraphClientFactory: props.context.msGraphClientFactory,
        spHttpClient: props.context.spHttpClient,
    };
    var _getPeoplePickerItems = function (selectedUserProfiles, internalName) { return __awaiter(void 0, void 0, void 0, function () {
        var emails, title;
        return __generator(this, function (_a) {
            if (selectedUserProfiles.length > 0) {
                emails = selectedUserProfiles[0].id.split("|")[2];
                title = selectedUserProfiles[0].text;
                handleInputChange(internalName, emails);
                if (internalName == "requestedFor") {
                    handleInputChange("requestedFor_Title", title);
                }
                if (internalName == "GroupOwner") {
                    handleInputChange("GroupOwner_Title", title);
                }
                console.log("Selected userids:", emails);
                console.log("Selected Items:", selectedUserProfiles);
            }
            else {
                handleInputChange(internalName, "");
            }
            return [2 /*return*/];
        });
    }); };
    var requesterFileList = null;
    var removeAttachment = function (fileName) {
        // Filter out the file to remove
        var updatedFile = uploadedFiles.filter(function (file) { return file.name !== fileName; });
        // Update the state with the new list of files
        setUploadedFiles(updatedFile);
        handleInputChange("files", updatedFile);
        // Update the formData to reflect the removal
    };
    var readFile = function (e, field) {
        requesterFileList = e.target.files;
        if (requesterFileList) {
            console.log("file details", fileInfo.files[0]);
            var fileExtension = fileInfo.files[0].name.substring(fileInfo.files[0].name.lastIndexOf(".") + 1, fileInfo.files[0].name.length);
            var fileName = fileInfo.files[0].name
                .substring(0, fileInfo.files[0].name.lastIndexOf(".") + 1)
                .replace(/[&\/\\#~%":*. [\]!¤+`´^?<>|{}]/g, "") +
                "." +
                fileExtension;
            var newFile_1 = {
                name: fileName,
                content: fileInfo.files[0],
            };
            // Add the new file to the existing state of uploaded files
            setUploadedFiles(function (prevFiles) {
                var updatedFiles = __spreadArray(__spreadArray([], prevFiles, true), [newFile_1], false);
                console.log("uploadedFiles file details", updatedFiles);
                // Update formData using the latest updatedFiles
                setFormData(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = updatedFiles, _a)));
                });
                return updatedFiles;
            });
            // Update progress for the newly added file
            var currentProgress_1 = 0;
            var interval_1 = setInterval(function () {
                if (currentProgress_1 >= 100) {
                    clearInterval(interval_1);
                }
                else {
                    currentProgress_1 += 10;
                    setUploadedFiles(function (prevFiles) {
                        return prevFiles.map(function (file) {
                            return file.name === newFile_1.name
                                ? __assign(__assign({}, file), { progress: currentProgress_1 }) : file;
                        });
                    });
                }
            }, 300);
        }
    };
    var updateFormData = function (event, newValue, column) {
        // newValue is the updated text from the Fluent UI TextField
        var value = newValue !== null && newValue !== void 0 ? newValue : "";
        // Update formData
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[column] = value, _a)));
        });
        // Remove the field's error if the user typed something valid
        setErrors(function (prevErrors) {
            var newErrors = __assign({}, prevErrors);
            if (newErrors[column] && value.trim() !== "") {
                delete newErrors[column];
            }
            return newErrors;
        });
        forceUpdate();
    };
    var updateFormDropData = function (option, column, columnKey) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[columnKey] = option === null || option === void 0 ? void 0 : option.key, _a)));
        });
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[column] = option === null || option === void 0 ? void 0 : option.text, _a)));
        });
        setErrors(function (prevErrors) {
            var newErrors = __assign({}, prevErrors);
            if (newErrors[column] && option.key) {
                delete newErrors[column];
            }
            return newErrors;
        });
        forceUpdate();
    };
    var forceUpdate = function () { return setForceUpdater(function (prev) { return prev + 1; }); };
    var _getPeoplePickerMemberItems = function (selectedUserProfiles, Member, Member_Text) { return __awaiter(void 0, void 0, void 0, function () {
        var emails, title;
        return __generator(this, function (_a) {
            if (selectedUserProfiles.length > 0) {
                emails = selectedUserProfiles[0].id.split("|")[2];
                title = selectedUserProfiles[0].text;
                handleInputChange(Member, emails);
                handleInputChange(Member_Text, title);
                console.log("Selected userids:", emails);
                console.log("Selected title:", title);
            }
            else {
                handleInputChange(Member, "");
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "maincontainer" },
            React.createElement("div", { className: "header-top" },
                React.createElement("div", { className: "person-image" }, initials),
                React.createElement("div", null,
                    React.createElement("div", { className: "person-name" }, (_c = props.userprofileAD) === null || _c === void 0 ? void 0 : _c.displayName),
                    React.createElement("div", { className: "person-description" }, (_d = props.userprofileAD) === null || _d === void 0 ? void 0 :
                        _d.jobTitle,
                        " | ID:",
                        " ",
                        props.EmpId ? props.EmpId : "N/A"))),
            React.createElement("div", { className: "textContainer" },
                React.createElement("h2", { className: "form-heading" }, isAr ? "يرجى ملء النموذج أدناه" : "Please fill up the form below"),
                React.createElement("div", { className: "fieldContainer" },
                    React.createElement(TextField, { type: "text", label: isAr ? "تم الطلب بواسطة" : "Requested By", className: "form-text", readOnly: true, value: (_e = props.userprofileAD) === null || _e === void 0 ? void 0 : _e.displayName }),
                    React.createElement("div", { className: "people-picker-wrapper ".concat(errors.requestedFor ? "error-border" : "") },
                        React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Requested for *", personSelectionLimit: 1, groupName: "", defaultSelectedUsers: [formData.requestedFor], showtooltip: true, disabled: false, searchTextLimit: 3, onChange: function (e) {
                                _getPeoplePickerItems(e, "requestedFor");
                            }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })),
                    React.createElement(TextField, { label: isAr ? "موقع *" : "Location *", value: formData.officeLocation, onChange: function (ev, newValue) {
                            return updateFormData(ev, newValue, "officeLocation");
                        }, className: "form-text  ".concat(errors.officeLocation ? "error-field" : "") }),
                    React.createElement(TextField, { label: isAr ? "رقم التليفون *" : "Phone Number *", value: formData.PhoneNumber, className: "form-text  ".concat(errors.PhoneNumber ? "error-field" : ""), onChange: function (ev, newValue) {
                            // Allow empty string or digits only
                            if (newValue === "" || /^\d+$/.test(newValue)) {
                                updateFormData(ev, newValue, "PhoneNumber");
                            }
                        }, inputMode: "numeric" }),
                    React.createElement(Dropdown, { label: isAr ? "اسم الخدمة *" : "Service Name *", selectedKey: formData.serviceName_key, className: "dropdownfield ".concat(!formData.serviceName ? "placeholder-gray" : "", " ").concat(errors.serviceName ? "error-field" : ""), styles: {
                            dropdown: {
                                borderColor: errors.serviceName ? "red" : undefined,
                            },
                        }, onChange: function (_, option) {
                            updateFormDropData(option, "serviceName", "serviceName_key");
                        }, options: [
                            {
                                key: "",
                                text: isAr ? "حدد اسم الخدمة..." : "Select Service Name...",
                                disabled: true,
                            },
                            {
                                key: "B197DDA58B034701A2D9E3BCC12B975B",
                                text: isAr
                                    ? "إنشاء مجموعة بريد جديدة"
                                    : "New Mail Group Creation",
                            },
                            {
                                key: "B646E0A186FC4736A74FE966AF9D51D9",
                                text: isAr
                                    ? "إضافة أعضاء إلى مجموعة البريد"
                                    : "Add Members to Mail Group",
                            },
                            {
                                key: "A87F96E9ED33461F93C401B25103ABE5",
                                text: isAr
                                    ? "إزالة أعضاء من مجموعة البريد"
                                    : "Remove Members from Mail Group",
                            },
                            {
                                key: "A71FE1D5F4E1453795CCC3D460FAE183",
                                text: isAr
                                    ? "تحديث اسم مجموعة البريد"
                                    : "Update Mail Group Name",
                            },
                            {
                                key: "B01F4D5317264F18A6660B3BF0E1F561",
                                text: isAr ? "أخرى" : "Others",
                            },
                        ] }),
                    React.createElement(TextField, { label: isAr ? "اسم المجموعة *" : "Group Name *", value: formData.GroupName, onChange: function (ev, newValue) {
                            return updateFormData(ev, newValue, "GroupName");
                        }, className: "form-text  ".concat(errors.GroupName ? "error-field" : "") }),
                    formData.serviceName == "Update Mail Group Name" && (React.createElement(React.Fragment, null,
                        React.createElement(TextField, { label: isAr
                                ? "تم تحديث اسم مجموعة البريد *"
                                : "Updated Mail Group Name *", value: formData.UpdatedMailGroupName, onChange: function (ev, newValue) {
                                return updateFormData(ev, newValue, "UpdatedMailGroupName");
                            }, className: "form-text  ".concat(errors.UpdatedMailGroupName ? "error-field" : "") }))),
                    formData.serviceName == "New Mail Group Creation" && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "people-picker-wrapper ".concat(errors.GroupOwner ? "error-border" : "") },
                            React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مالك المجموعة *" : "Group Owner *", personSelectionLimit: 1, groupName: "", defaultSelectedUsers: [formData.GroupOwner], showtooltip: true, disabled: false, searchTextLimit: 3, onChange: function (e) {
                                    _getPeoplePickerItems(e, "GroupOwner");
                                }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                    formData.serviceName != "Update Mail Group Name" &&
                        formData.serviceName != "Others" && (React.createElement(React.Fragment, null,
                        React.createElement(Dropdown, { label: isAr ? "عضو *" : "Member *", selectedKey: formData.Member_key, className: "dropdownfield ".concat(!formData.Member ? "placeholder-gray" : "", " ").concat(errors.Member ? "error-field" : ""), styles: {
                                dropdown: {
                                    borderColor: errors.Member ? "red" : undefined,
                                },
                            }, onChange: function (_, option) {
                                updateFormDropData(option, "Member", "Member_key");
                            }, options: [
                                {
                                    key: "",
                                    text: isAr ? "اختر عضوا" : "Select Member",
                                    disabled: true,
                                },
                                {
                                    key: "2AFF75385A554A949681D0AFC942EBD3",
                                    text: isAr ? "واحد" : "1",
                                },
                                {
                                    key: "0218C526AAF24F90938B8ED67EFC20E9",
                                    text: isAr ? "إثنان" : "2",
                                },
                                {
                                    key: "0D1E7D29D14343A3A4F7F6066FFF564F",
                                    text: isAr ? "ثلاثة" : "3",
                                },
                                {
                                    key: "879E077A5FF94D20A7B3E8FD27A9E41C",
                                    text: isAr ? "أربعة" : "4",
                                },
                                {
                                    key: "CE2D7FC4561648D5847E09243DD3F3BA",
                                    text: isAr ? "خمسة" : "5",
                                },
                                {
                                    key: "763DBA7DEB7A4E349E5E623ACB072A97",
                                    text: isAr ? "ستة" : "6",
                                },
                            ] }),
                        formData.Member >= "1" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member1 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member1 *", personSelectionLimit: 1, groupName: "", defaultSelectedUsers: [formData.Member1], showtooltip: true, disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member1", "Member1_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                        formData.Member >= "2" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member2 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member2 *", personSelectionLimit: 1, groupName: "", showtooltip: true, defaultSelectedUsers: [formData.Member2], disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member2", "Member2_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                        formData.Member >= "3" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member3 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member3 *", personSelectionLimit: 1, groupName: "", showtooltip: true, defaultSelectedUsers: [formData.Member3], disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member3", "Member3_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                        formData.Member >= "4" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member4 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member4 *", personSelectionLimit: 1, groupName: "", showtooltip: true, defaultSelectedUsers: [formData.Member4], disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member4", "Member4_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                        formData.Member >= "5" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member5 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member5 *", personSelectionLimit: 1, groupName: "", showtooltip: true, defaultSelectedUsers: [formData.Member5], disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member5", "Member5_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })))),
                        formData.Member >= "6" && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "people-picker-wrapper ".concat(errors.Member6 ? "error-border" : "") },
                                React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Member6 *", personSelectionLimit: 1, groupName: "", defaultSelectedUsers: [formData.Member6], showtooltip: true, disabled: false, searchTextLimit: 3, onChange: function (e) {
                                        _getPeoplePickerMemberItems(e, "Member6", "Member6_Title");
                                    }, principalTypes: [PrincipalType.User], resolveDelay: 1000 }))))))),
                React.createElement("div", { className: "description_div" },
                    React.createElement(TextField, { label: isAr ? "وصف *" : "Description *", value: formData.description, multiline: true, rows: 4, type: "text-area", className: "text-area ".concat(errors.description ? "error-field" : ""), onChange: function (ev, newValue) {
                            return updateFormData(ev, newValue, "description");
                        }, styles: {
                            root: { color: "#555" },
                            fieldGroup: { border: "1px solid #ccc" },
                            field: { color: "#555" },
                        } })),
                React.createElement(Col, { className: "mt-4" },
                    React.createElement("div", { style: { display: "flex", alignItems: "end" } },
                        React.createElement("label", { style: {
                                marginRight: "4px",
                                marginTop: "24px",
                                fontSize: "12px",
                                fontFamily: "Segoe UI",
                                color: "#555555",
                                fontWeight: "500",
                                marginBottom: "11.5px",
                            } }, isAr
                            ? "أي مستندات أو صور تساعد في إثبات القضية:"
                            : "Any documents or pictures (optional):")),
                    React.createElement("div", { className: "attachment-container" },
                        React.createElement("div", { className: "attachment-placeholder" },
                            React.createElement("img", { className: "attachment-icon", src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKoSURBVHgB7ZnbjdpAFIaPDYLX7WDdQUBcJJ4CFWRTQUgHbAVABbAVQCpIOljyhIS4leAO4rwB4pL/sMcbxxdij8dWFO0vjcY7c8Z8mjOeOXPWoAgtFotKsVgc4bGCckfpZO/3+06r1bIpoYywxuVy+WCa5kTAHJSfpK57qZUgA4Cbzca6XC7PeOT6CaCDarXqkKLW67WdBtL0N5zP567ATWu1Wi8NnE9bfm+5XH7GJMReMgFAwzDeXztM8wtpFN7bIYFkD8WFNKM6drudTRrFnhBIG6USF9KkHBUC+fVvY3IFZAHS9kC2V6vV5JZ9boDz+dxyn72QqLu3IDMHhBu/cV0qlfre9hDIUdj4ImUs7AZjQH5gCOyJbXpx7VVof7VDfw+QDra24R/jKWN5Zuo7ioXS9hWLfkN2/eMzn0EWQzKMbCuVMBs5vQLSCggX9VDdw02PYf1yKs3C+uD+sGZ9LgZcHy4ayVqakCZpARS4gfu3fJV90qDUgD44N7DgE2OgAzIVIOLGTy4cFvlnkrjxeDx2dEEqA0pQOxW4R3wYU7ev2WxuT6fTR34WyB4pSgmQrwMScTPcEHBjv02j0ZjJrDLkiGebFKQEWCgUHlDdCdwgyo5nlWeXXiCrpCAlQIbiH7wF57Ed80nCVwdSkPJGjU13m8B2RorKPR5MqjfAtPrnAXWHWz9QLqRRWgElMNUqrYAasxCv+r/WoBz67yiFcPRt6/X6U1z7RIBYY3zgVyiF8A4bVWaAHEJZlE6xj0hWIkC5ndmUo8I+kmtUjPSvRTkJ11F32QR2gQAgFvGMa8R8Wi49cYTf7EkdcH8AUMJ4myTzxNEzZSROKElOhj8+53A4DP02oUl0b56a8pHDFy2+y/g7jKgRAjkgPf+GiBRnvzBz46jE+i8JiDR7F2tlUAAAAABJRU5ErkJggg==", alt: "Attachment Icon" }),
                            isAr
                                ? "إرفاق الملف بتنسيق PNG أو JPG أو PDF (اختياري)"
                                : "Attach file in PNG, JPG, or PDF format (optional)",
                            React.createElement("input", { type: "file", 
                                // ref={inputRef}
                                multiple: true, ref: function (element) {
                                    fileInfo = element;
                                }, onChange: function (e) {
                                    readFile(e, "files");
                                } })),
                        React.createElement("span", { style: { color: "red" } }, errors.files || showErrorUpload)),
                    uploadedFiles.map(function (file, index) { return (React.createElement("div", { key: index },
                        React.createElement("div", { className: "uploadeditems" },
                            React.createElement("strong", null, file.name),
                            React.createElement("div", { className: "progresscontainer" },
                                React.createElement("div", { className: "progressbar", id: "progressbar", style: { width: "".concat(file["progress"], "%") } })),
                            React.createElement("div", { className: "cancelbtn", onClick: function () {
                                    removeAttachment(file.name); // Pass the file name to remove it
                                } }, "X")))); })),
                React.createElement("div", { className: "buttonContainer" },
                    React.createElement(PrimaryButton, { onClick: function () {
                            handleSubmit();
                        }, styles: { root: { fontSize: "20px" } }, text: !isAr ? "Submit" : "يُقدِّم", className: "submit-formbtn" }),
                    React.createElement(DefaultButton, { text: !isAr ? "Cancel" : "يلغي", className: "cancel-formbtn", onClick: function () {
                            setFormData({
                                requestedFor: "",
                                requestedFor_key: "",
                                serviceName: "",
                                serviceName_key: "",
                                officeLocation: "",
                                PhoneNumber: "",
                                description: "",
                                GroupName: "",
                                GroupOwner: "",
                                Member: "",
                                Member_key: "2AFF75385A554A949681D0AFC942EBD3",
                                Member1: "",
                                Member2: "",
                                Member3: "",
                                Member4: "",
                                Member5: "",
                                Member6: "",
                                UpdatedMailGroupName: "",
                                requestedFor_Title: "",
                                files: [],
                                GroupOwner_Title: "",
                                GroupOwner_key: "",
                                Member1_Title: "",
                                Member2_Title: "",
                                Member3_Title: "",
                                Member4_Title: "",
                                Member5_Title: "",
                                Member6_Title: "",
                            });
                            setUploadedFiles([]);
                            setShowErrorUpload("");
                            setErrors({});
                            if (inputRef.current)
                                inputRef.current.value = "";
                            fileInfo = null;
                        } })))),
        React.createElement("div", { className: "testelement" })));
};
export default ServiceUIForm;
//# sourceMappingURL=ServiceUIForm.js.map