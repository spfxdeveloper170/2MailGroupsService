var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ServiceWebPartStrings';
import Service from './components/Service';
var ServiceWebPart = /** @class */ (function (_super) {
    __extends(ServiceWebPart, _super);
    function ServiceWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceWebPart.prototype.render = function () {
        var element = React.createElement(Service, {
            context: this.context,
            Apilink: this.properties.Apilink,
            subscriptionId: this.properties.subscriptionId,
            OcpApimKey: this.properties.OcpApimKey,
            Subject: this.properties.Subject
        });
        ReactDom.render(element, this.domElement);
    };
    ServiceWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('Apilink', {
                                    label: "API Link",
                                    value: this.properties.Apilink,
                                }),
                                PropertyPaneTextField('subscriptionId', {
                                    label: "subscription Id",
                                    value: this.properties.subscriptionId,
                                }),
                                PropertyPaneTextField('OcpApimKey', {
                                    label: "Ocp-Apim-Subscription-Key",
                                    value: this.properties.OcpApimKey,
                                }),
                                PropertyPaneTextField('Subject', {
                                    label: "Service Subject",
                                    value: this.properties.OcpApimKey,
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ServiceWebPart;
}(BaseClientSideWebPart));
export default ServiceWebPart;
//# sourceMappingURL=ServiceWebPart.js.map