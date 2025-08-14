import * as React from "react";
import { useState, useRef } from "react";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  DatePicker,
  DayOfWeek,
  mergeStyles,
  defaultDatePickerStrings,
  mergeStyleSets,
} from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "../css/style.css";
import {
  IUserProfile,
  IServiceRequestFormData,
  IServiceProps,
} from "../webparts/service/components/IServiceProps";
import {
  IPeoplePickerContext,
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Col } from "react-bootstrap";

export interface IRequestUIFormProps {
  context: WebPartContext;
  userprofileAD: IUserProfile;
  EmpId: string;
  onErrorRequiredFields: () => void;
  onSave: (formData: IServiceRequestFormData) => Promise<void>;
  OcpApimKey: string;
  UserRecIdApilink: string;
}
const isAr =
  window.location.pathname.includes("/ar/") ||
  window.location.search.includes("lang=ar");

const ServiceUIForm: React.FC<IRequestUIFormProps> = (props) => {
  const [formData, setFormData] = useState<IServiceRequestFormData>({
    requestedBy: props.userprofileAD?.displayName,
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
    Member1_key: "",
    Member2_key: "",
    Member3_key: "",
    Member4_key: "",
    Member5_key: "",
    Member6_key: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string }>>(
    []
  );
  const [showErrorUpload, setShowErrorUpload] = useState("");
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [selectedPeoplePickerProfiles, setselectedPeoplePickerProfiles] =
    useState<IUserProfile[]>([]);
  const [, setForceUpdater] = useState(0);

  let fileInfo: HTMLInputElement;
  function handleInputChange(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm() {
    const newErrors: { [field: string]: string } = {};
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
    if (
      formData.serviceName != "Update Mail Group Name" &&
      formData.serviceName != "Others"
    ) {
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

  async function handleSubmit() {
    //   e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    await props.onSave(formData);
  }
  const displayName = props.userprofileAD?.displayName;

  let initials = "";
  if (displayName && displayName.trim()) {
    const parts = displayName.split(" ");
    initials = parts[0][0] + parts[parts.length - 1][0];
  } else {
    initials = "";
  }

  const peoplePickerContext: IPeoplePickerContext = {
    absoluteUrl: props.context.pageContext.web.absoluteUrl,
    msGraphClientFactory: props.context.msGraphClientFactory as any,
    spHttpClient: props.context.spHttpClient as any,
  };
  const _getPeoplePickerItems = async (
    selectedUserProfiles: any[],
    internalName: string,
    internalName_text: string,
    internalName_key: string
  ) => {
    if (selectedUserProfiles.length > 0) {
      const emails = selectedUserProfiles[0].id.split("|")[2];
      const title = selectedUserProfiles[0].text;
      handleInputChange(internalName, emails);
      handleInputChange(internalName_text, title);
      _getUserRecId(emails, internalName_key);
      console.log("Selected userids:", emails);
      console.log("Selected Items:", selectedUserProfiles);
    } else {
      handleInputChange(internalName, "");
      handleInputChange(internalName_text, "");
      handleInputChange(internalName_key, "");
    }
  };
  const _getUserRecId = async (email, columnkey) => {
    try {
      console.log("_getUserRecId function is called");
      const response = await fetch(props.UserRecIdApilink, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": props.OcpApimKey,
          Email: email,
        },
      });
      if (response.ok) {
        const rawResponse = await response.text();
        const jsonStart = rawResponse.indexOf("{");
        if (jsonStart === -1) {
          throw new Error("JSON not found in response");
        }

        // Step 2: Extract only the JSON string
        const jsonString = rawResponse.slice(jsonStart);

        // Step 3: Parse the JSON
        let parsedData;
        try {
          parsedData = JSON.parse(jsonString);
          console.log("requestRecId Hardware Request:", parsedData);
        } catch (e) {
          throw new Error("Failed to parse JSON: " + e.message);
        }
        let UserEmail = parsedData.value[0].PrimaryEmail;
        let RecId = parsedData.value[0].RecId;
        handleInputChange(columnkey, RecId);
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      console.error("Error getting UserRecId:", error);
    }
  };
  let requesterFileList: FileList | null = null;
  const removeAttachment = (fileName: string) => {
    // Filter out the file to remove
    const updatedFile = uploadedFiles.filter((file) => file.name !== fileName);

    // Update the state with the new list of files
    setUploadedFiles(updatedFile);
    handleInputChange("files", updatedFile);
    // Update the formData to reflect the removal
  };

  const readFile = (e: React.ChangeEvent<HTMLInputElement>, field) => {
    requesterFileList = e.target.files;
    if (requesterFileList) {
      console.log("file details", fileInfo.files[0]);
      const fileExtension = fileInfo.files[0].name.substring(
        fileInfo.files[0].name.lastIndexOf(".") + 1,
        fileInfo.files[0].name.length
      );
      const fileName =
        fileInfo.files[0].name
          .substring(0, fileInfo.files[0].name.lastIndexOf(".") + 1)
          .replace(/[&\/\\#~%":*. [\]!¤+`´^?<>|{}]/g, "") +
        "." +
        fileExtension;

      const newFile = {
        name: fileName,
        content: fileInfo.files[0],
      };

      // Add the new file to the existing state of uploaded files
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        console.log("uploadedFiles file details", updatedFiles);

        // Update formData using the latest updatedFiles
        setFormData((prev) => ({ ...prev, [field]: updatedFiles }));

        return updatedFiles;
      });
      // Update progress for the newly added file
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress >= 100) {
          clearInterval(interval);
        } else {
          currentProgress += 10;
          setUploadedFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.name === newFile.name
                ? { ...file, progress: currentProgress }
                : file
            )
          );
        }
      }, 300);
    }
  };

  const updateFormData = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined,
    column: any
  ) => {
    // newValue is the updated text from the Fluent UI TextField
    const value = newValue ?? "";

    // Update formData
    setFormData((prev) => ({
      ...prev,
      [column]: value,
    }));

    // Remove the field's error if the user typed something valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[column] && value.trim() !== "") {
        delete newErrors[column];
      }
      return newErrors;
    });

    forceUpdate();
  };
  const updateFormDropData = (option: any, column: any, columnKey: any) => {
    setFormData((prev) => ({ ...prev, [columnKey]: option?.key as string }));
    setFormData((prev) => ({ ...prev, [column]: option?.text as string }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[column] && option.key) {
        delete newErrors[column];
      }
      return newErrors;
    });

    forceUpdate();
  };
  const forceUpdate = () => setForceUpdater((prev) => prev + 1);
  const _getPeoplePickerMemberItems = async (
    selectedUserProfiles: any[],
    internalName: string,
    internalName_text: string,
    internalName_key: string
  ) => {
    if (selectedUserProfiles.length > 0) {
      const emails = selectedUserProfiles[0].id.split("|")[2];
      const title = selectedUserProfiles[0].text;
      handleInputChange(internalName, emails);
      handleInputChange(internalName_text, title);
      _getUserRecId(emails, internalName_key);
      console.log("Selected userids:", emails);
      console.log("Selected title:", title);
    } else {
      handleInputChange(internalName, "");
      handleInputChange(internalName_text, "");
      handleInputChange(internalName_key, "");
       
    }
  };
  return (
    <div>
      <div className="maincontainer">
        <div className="header-top">
          <div className="person-image">{initials}</div>
          <div>
            <div className="person-name">
              {props.userprofileAD?.displayName}
            </div>
            <div className="person-description">
              {props.userprofileAD?.jobTitle} | ID:{" "}
              {props.EmpId ? props.EmpId : "N/A"}
            </div>
          </div>
        </div>
        <div className="textContainer">
          <h2 className="form-heading">
            {isAr ? "يرجى ملء النموذج أدناه" : "Please fill up the form below"}
          </h2>

          <div className="fieldContainer">
            {/* Requested By */}
            <TextField
              type="text"
              label={isAr ? "تم الطلب بواسطة" : "Requested By"}
              className="form-text"
              readOnly
              value={props.userprofileAD?.displayName}
            />
            <div
              className={`people-picker-wrapper ${
                errors.requestedFor ? "error-border" : ""
              }`}
            >
              <PeoplePicker
                context={peoplePickerContext}
                titleText={isAr ? "مطلوب ل *" : "Requested for *"}
                personSelectionLimit={1}
                groupName={""}
                defaultSelectedUsers={[formData.requestedFor]}
                showtooltip={true}
                disabled={false}
                searchTextLimit={3}
                onChange={(e) => {
                  _getPeoplePickerItems(
                    e,
                    "requestedFor",
                    "requestedFor_Title",
                    "requestedFor_key"
                  );
                }}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
            </div>

            <TextField
              label={isAr ? "موقع *" : "Location *"}
              value={formData.officeLocation}
              onChange={(ev, newValue) =>
                updateFormData(ev, newValue, "officeLocation")
              }
              className={`form-text  ${
                errors.officeLocation ? "error-field" : ""
              }`}
            />

            <TextField
              label={isAr ? "رقم التليفون *" : "Phone Number *"}
              value={formData.PhoneNumber}
              className={`form-text  ${
                errors.PhoneNumber ? "error-field" : ""
              }`}
              onChange={(ev, newValue) => {
                // Allow empty string or digits only
                if (newValue === "" || /^\d+$/.test(newValue)) {
                  updateFormData(ev, newValue, "PhoneNumber");
                }
              }}
              inputMode="numeric"
            />

            <Dropdown
              label={isAr ? "اسم الخدمة *" : "Service Name *"}
              selectedKey={formData.serviceName_key}
              className={`dropdownfield ${
                !formData.serviceName ? "placeholder-gray" : ""
              } ${errors.serviceName ? "error-field" : ""}`}
              styles={{
                dropdown: {
                  borderColor: errors.serviceName ? "red" : undefined,
                },
              }}
              onChange={(_, option) => {
                updateFormDropData(option, "serviceName", "serviceName_key");
              }}
              options={[
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
              ]}
            />
            <TextField
              label={isAr ? "اسم المجموعة *" : "Group Name *"}
              value={formData.GroupName}
              onChange={(ev, newValue) =>
                updateFormData(ev, newValue, "GroupName")
              }
              className={`form-text  ${errors.GroupName ? "error-field" : ""}`}
            />
            {formData.serviceName == "Update Mail Group Name" && (
              <>
                <TextField
                  label={
                    isAr
                      ? "تم تحديث اسم مجموعة البريد *"
                      : "Updated Mail Group Name *"
                  }
                  value={formData.UpdatedMailGroupName}
                  onChange={(ev, newValue) =>
                    updateFormData(ev, newValue, "UpdatedMailGroupName")
                  }
                  className={`form-text  ${
                    errors.UpdatedMailGroupName ? "error-field" : ""
                  }`}
                />
              </>
            )}

            {formData.serviceName == "New Mail Group Creation" && (
              <>
                <div
                  className={`people-picker-wrapper ${
                    errors.GroupOwner ? "error-border" : ""
                  }`}
                >
                  <PeoplePicker
                    context={peoplePickerContext}
                    titleText={isAr ? "مالك المجموعة *" : "Group Owner *"}
                    personSelectionLimit={1}
                    groupName={""}
                    defaultSelectedUsers={[formData.GroupOwner]}
                    showtooltip={true}
                    disabled={false}
                    searchTextLimit={3}
                    onChange={(e) => {
                      _getPeoplePickerItems(
                        e,
                        "GroupOwner",
                        "GroupOwner_Title",
                        "GroupOwner_key"
                      );
                    }}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                  />
                </div>
              </>
            )}
            {formData.serviceName != "Update Mail Group Name" &&
              formData.serviceName != "Others" && (
                <>
                  <Dropdown
                    label={isAr ? "عضو *" : "Member *"}
                    selectedKey={formData.Member_key}
                    className={`dropdownfield ${
                      !formData.Member ? "placeholder-gray" : ""
                    } ${errors.Member ? "error-field" : ""}`}
                    styles={{
                      dropdown: {
                        borderColor: errors.Member ? "red" : undefined,
                      },
                    }}
                    onChange={(_, option) => {
                      updateFormDropData(option, "Member", "Member_key");
                    }}
                    options={[
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
                    ]}
                  />
                  {formData.Member >= "1" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member1 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member1 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          defaultSelectedUsers={[formData.Member1]}
                          showtooltip={true}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member1",
                              "Member1_Title",
                              "Member1_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                  {formData.Member >= "2" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member2 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member2 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          showtooltip={true}
                          defaultSelectedUsers={[formData.Member2]}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member2",
                              "Member2_Title",
                              "Member2_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                  {formData.Member >= "3" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member3 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member3 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          showtooltip={true}
                          defaultSelectedUsers={[formData.Member3]}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member3",
                              "Member3_Title",
                              "Member3_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                  {formData.Member >= "4" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member4 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member4 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          showtooltip={true}
                          defaultSelectedUsers={[formData.Member4]}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member4",
                              "Member4_Title",
                              "Member4_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                  {formData.Member >= "5" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member5 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member5 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          showtooltip={true}
                          defaultSelectedUsers={[formData.Member5]}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member5",
                              "Member5_Title",
                              "Member5_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                  {formData.Member >= "6" && (
                    <>
                      <div
                        className={`people-picker-wrapper ${
                          errors.Member6 ? "error-border" : ""
                        }`}
                      >
                        <PeoplePicker
                          context={peoplePickerContext}
                          titleText={isAr ? "مطلوب ل *" : "Member6 *"}
                          personSelectionLimit={1}
                          groupName={""}
                          defaultSelectedUsers={[formData.Member6]}
                          showtooltip={true}
                          disabled={false}
                          searchTextLimit={3}
                          onChange={(e) => {
                            _getPeoplePickerMemberItems(
                              e,
                              "Member6",
                              "Member6_Title",
                              "Member6_key"
                            );
                          }}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
          </div>
          <div className="description_div">
            <TextField
              label={isAr ? "وصف *" : "Description *"}
              value={formData.description}
              multiline
              rows={4}
              type="text-area"
              className={`text-area ${errors.description ? "error-field" : ""}`}
              onChange={(ev, newValue) =>
                updateFormData(ev, newValue, "description")
              }
              styles={{
                root: { color: "#555" },
                fieldGroup: { border: "1px solid #ccc" },
                field: { color: "#555" },
              }}
            />
          </div>
          <Col className="mt-4">
            <div style={{ display: "flex", alignItems: "end" }}>
              <label
                style={{
                  marginRight: "4px",
                  marginTop: "24px",
                  fontSize: "12px",
                  fontFamily: "Segoe UI",
                  color: "#555555",
                  fontWeight: "500",
                  marginBottom: "11.5px",
                }}
              >
                {isAr
                  ? "أي مستندات أو صور تساعد في إثبات القضية:"
                  : "Any documents or pictures (optional):"}
              </label>
            </div>

            <div className="attachment-container">
              <div className="attachment-placeholder">
                <img
                  className="attachment-icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKoSURBVHgB7ZnbjdpAFIaPDYLX7WDdQUBcJJ4CFWRTQUgHbAVABbAVQCpIOljyhIS4leAO4rwB4pL/sMcbxxdij8dWFO0vjcY7c8Z8mjOeOXPWoAgtFotKsVgc4bGCckfpZO/3+06r1bIpoYywxuVy+WCa5kTAHJSfpK57qZUgA4Cbzca6XC7PeOT6CaCDarXqkKLW67WdBtL0N5zP567ATWu1Wi8NnE9bfm+5XH7GJMReMgFAwzDeXztM8wtpFN7bIYFkD8WFNKM6drudTRrFnhBIG6USF9KkHBUC+fVvY3IFZAHS9kC2V6vV5JZ9boDz+dxyn72QqLu3IDMHhBu/cV0qlfre9hDIUdj4ImUs7AZjQH5gCOyJbXpx7VVof7VDfw+QDra24R/jKWN5Zuo7ioXS9hWLfkN2/eMzn0EWQzKMbCuVMBs5vQLSCggX9VDdw02PYf1yKs3C+uD+sGZ9LgZcHy4ayVqakCZpARS4gfu3fJV90qDUgD44N7DgE2OgAzIVIOLGTy4cFvlnkrjxeDx2dEEqA0pQOxW4R3wYU7ev2WxuT6fTR34WyB4pSgmQrwMScTPcEHBjv02j0ZjJrDLkiGebFKQEWCgUHlDdCdwgyo5nlWeXXiCrpCAlQIbiH7wF57Ed80nCVwdSkPJGjU13m8B2RorKPR5MqjfAtPrnAXWHWz9QLqRRWgElMNUqrYAasxCv+r/WoBz67yiFcPRt6/X6U1z7RIBYY3zgVyiF8A4bVWaAHEJZlE6xj0hWIkC5ndmUo8I+kmtUjPSvRTkJ11F32QR2gQAgFvGMa8R8Wi49cYTf7EkdcH8AUMJ4myTzxNEzZSROKElOhj8+53A4DP02oUl0b56a8pHDFy2+y/g7jKgRAjkgPf+GiBRnvzBz46jE+i8JiDR7F2tlUAAAAABJRU5ErkJggg=="
                  alt="Attachment Icon"
                />
                {isAr
                  ? "إرفاق الملف بتنسيق PNG أو JPG أو PDF (اختياري)"
                  : "Attach file in PNG, JPG, or PDF format (optional)"}
                <input
                  type="file"
                  // ref={inputRef}
                  multiple={true}
                  ref={(element) => {
                    fileInfo = element;
                  }}
                  onChange={(e) => {
                    readFile(e, "files");
                  }}
                />
              </div>
              <span style={{ color: "red" }}>
                {errors.files || showErrorUpload}
              </span>
            </div>

            {uploadedFiles.map((file, index) => (
              <div key={index}>
                <div className="uploadeditems">
                  <strong>{file.name}</strong>
                  <div className="progresscontainer">
                    <div
                      className="progressbar"
                      id="progressbar"
                      style={{ width: `${file["progress"]}%` }} // Each file has its own progress
                    ></div>
                  </div>
                  <div
                    className="cancelbtn"
                    onClick={() => {
                      removeAttachment(file.name); // Pass the file name to remove it
                    }}
                  >
                    X
                  </div>
                </div>
              </div>
            ))}
            {/* <p style={{ color: "gray" }}>
                  {!isAr
                    ? "# You can upload up to 10 documents or images."
                    : "يمكنك تحميل ما يصل إلى 10 مستندات أو صور."}
                </p> */}
          </Col>
          <div className="buttonContainer">
            <PrimaryButton
              onClick={() => {
                handleSubmit();
              }}
              styles={{ root: { fontSize: "20px" } }}
              text={!isAr ? "Submit" : "يُقدِّم"}
              className="submit-formbtn"
            />
            <DefaultButton
              text={!isAr ? "Cancel" : "يلغي"}
              className="cancel-formbtn"
              onClick={() => {
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
                  Member1_key: "",
                  Member2_key: "",
                  Member3_key: "",
                  Member4_key: "",
                  Member5_key: "",
                  Member6_key: "",
                });
                setUploadedFiles([]);
                setShowErrorUpload("");
                setErrors({});
                if (inputRef.current) inputRef.current.value = "";
                fileInfo = null;
              }}
            />
          </div>
        </div>
      </div>
      <div className="testelement"></div>
    </div>
  );
};

export default ServiceUIForm;
