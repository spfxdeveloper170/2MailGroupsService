import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IServiceWebPartProps {
    Apilink: string;
    subscriptionId: string;
    OcpApimKey: string;
    Subject: string;
}
export default class ServiceWebPart extends BaseClientSideWebPart<IServiceWebPartProps> {
    render(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ServiceWebPart.d.ts.map