import * as React from 'react';
import { useEffect, useState } from "react";
import { MSGraphClient } from "@microsoft/sp-http";
import styles from './Service.module.scss';
import type { IServiceProps ,IServiceRequestFormData} from './IServiceProps';
import { escape } from '@microsoft/sp-lodash-subset';
import AlertModal from "../../../components/alertModal/AlertModal";
import { Web } from "@pnp/sp/webs";
import ServiceUIForm from "../../../components/ServiceUIForm";
interface IUserProfile {
  displayName: string;
  jobTitle: string;
  department: string;
  employeeId: string;
}
//const rootSiteURL = window.location.protocol + "//" + window.location.hostname + "/sites/MCIT-Internal-Services";
const getUserInitials = (displayName: string): string => {
  const names = displayName.trim().split(" ");
  const initials = names.map(name => name.charAt(0).toUpperCase()).join("");
  return initials;
};
const generateGUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const generateUserTitle = async (userProfileAD: IUserProfile | null): Promise<string> => {
  if (!userProfileAD || !userProfileAD.displayName) {
    throw new Error("User profile information is missing.");
  }
  const userInitials = getUserInitials(userProfileAD.displayName);
  const guid = generateGUID().substring(0, 8);
  const title = `MR-${userInitials}-${guid}`;
  console.log("Generated User Title:", title);
  return title;
};
const ServiceRequest: React.FC<IServiceProps> = (props) => {
  const [userProfileAD, setUserProfileAD] = useState<IUserProfile | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [alertsection, setAlertsection] = useState("");
  const [iconLoad, setIconLoad] = useState("");
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = (section: string) => {
    setShowModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
       

        const client: MSGraphClient = await props.context.msGraphClientFactory.getClient("3");
        const userAD: any = await client
          .api("/me")
          .select("displayName,jobTitle,department,employeeId,mail,onPremisesExtensionAttributes")
          .get();

        const userProfile: IUserProfile = {
          displayName: userAD.displayName || "",
          jobTitle: userAD.jobTitle || "",
          department: userAD.department || "",
          employeeId: userAD?.onPremisesExtensionAttributes?.extensionAttribute15 || ""
        };

        setUserProfileAD(userProfile);
        setIsLoadingUser(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsLoadingUser(false);
      }
    })();
  }, [props]);

  const showErrorModal = () => {
    setModalHeading("Warning");
    setModalMessage("Please fill Required fields");
    setAlertsection("rejected");
    setIconLoad("WarningSolid");
    handleShowModal();
  };

  const saveRequest = async (formData: IServiceRequestFormData) => {
    try {
      console.log(formData)
      const payload = {
        attachmentsToDelete: [],
        attachmentsToUpload: [],
        parameters: {
          "par-E08E7EC0B6C6492AB585EAEABD229177":formData.requestedBy,
          "par-1A7E025815E848079C270DFDF77C1AD4":formData.requestedFor_Title,  // Requested for
          "par-1A7E025815E848079C270DFDF77C1AD4-recId":formData.requestedFor_key,  // Requested for
          "par-1D2D1291F1EA415E9DADE0D1B49125A2": formData.serviceName,
          "par-1D2D1291F1EA415E9DADE0D1B49125A2-recId": formData.serviceName_key,
          "par-484EDCE1C7784531BB1B501B6E5D3FF8": formData.officeLocation,
          "par-C6076D8A357545AA8B7E691708DB58FA": formData.PhoneNumber,
          "par-8ADC459796CE4484A23CFB46AD41CF24":formData.GroupName,
          "par-FB268B0DDD754BBB938814A4446F9122":formData.UpdatedMailGroupName,
          "par-FFA0B18C61F4438A91610F43F95F8D05":formData.GroupOwner_Title,
          "par-FFA0B18C61F4438A91610F43F95F8D05-recId":formData.GroupOwner_key,
          "par-B43021C22BEF4CD194DC8234C42101B1":formData.Member,
          "par-B43021C22BEF4CD194DC8234C42101B1-recId":formData.Member_key,

          "par-9D3B97B6278447C5AC34D708F49F64BF":formData.Member1_Title,
          "par-8A10089480524EB58505D440CF9C5993":formData.Member2_Title,
          "par-3374F84E5B244144BD8D17AD27EA71FD":formData.Member3_Title,
          "par-15AF07CBAE014F468D2EF1593AC3BC3D":formData.Member4_Title,
          "par-EB636D7E7AE9403AAE96D4B3C1D06D3F":formData.Member5_Title,
          "par-058CC7FBAB7545578AEA708C2F301B13":formData.Member6_Title,
          "par-6B69A784061A43B9AA2FC5CFAF373C97": formData.description
        },
        delayedFulfill: false,
        formName: "ServiceReq.ResponsiveAnalyst.DefaultLayout",
        saveReqState: false,
        serviceReqData: {
          Subject: `${props.Subject}`,
          Symptom:formData.description,// "It allows employees to make Mobile and International calls with standards features like Voicemail and Call Forwarding",
          Category: "Calling",
          CreatedBy: "Ashish",
          Subcategory: "Access"
        },
        subscriptionId: props.subscriptionId
      };
      const response = await fetch(`${props.Apilink}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": `${props.OcpApimKey}`,
          "Email": "pmishra@mcit.gov.qa",
        },
        body: JSON.stringify(payload)
      });
      console.log("response",response)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
      setModalHeading("Success");
      setModalMessage("Your Request has been submitted successfully.");
      setAlertsection("Accepted");
      setIconLoad("SkypeCircleCheck");
      handleShowModal();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting Request:", error);
      setModalHeading("Error");
      setModalMessage(error.message);
      setAlertsection("rejected");
      setIconLoad("ErrorBadge");
      handleShowModal();
    }
  };


  if (isLoadingUser) {
    return <div>Loading user information...</div>;
  }
  return (
    <>
      <ServiceUIForm
        context={props.context}
        userprofileAD={userProfileAD}
        EmpId={userProfileAD?.employeeId || ""}
        onErrorRequiredFields={() => showErrorModal()}
        onSave={async (formData) => {
          await saveRequest(formData);
        }}
      />

      <AlertModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        heading={modalHeading}
        message={modalMessage}
        style={""}
        section={alertsection}
        icon={iconLoad}
      />
    </>
  );
};

export default ServiceRequest;