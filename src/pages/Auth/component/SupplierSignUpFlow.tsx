import { useState } from "react";
import SupplierSignUpForm from "./SupplierSignUpForm";
import SupplierLicenseUpload from "./SupplierLicenseUpload";
import SupplierSuccessNotice from "./SupplierSuccessNotice";

interface SupplierSignUpFlowProps {
    onSwitch: () => void;
}

type FlowStep = "step1" | "step2" | "success";

const SupplierSignUpFlow = ({ onSwitch }: SupplierSignUpFlowProps) => {
    const [currentStep, setCurrentStep] = useState<FlowStep>("step1");
    const [supplierId, setSupplierId] = useState<string>("");

    const handleStep1Success = (id: string) => {
        console.log("Step 1 success, supplier ID:", id);
        setSupplierId(id);
        setCurrentStep("step2");
    };

    const handleStep2Complete = () => {
        console.log("Step 2 complete, moving to success");
        setCurrentStep("success");
    };

    const handleBackToLogin = () => {
        console.log("Back to login");
        setCurrentStep("step1");
        setSupplierId("");
        onSwitch();
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case "step1":
                return (
                    <SupplierSignUpForm
                        onSwitch={onSwitch}
                        onStep1Success={handleStep1Success}
                    />
                );
            case "step2":
                return (
                    <SupplierLicenseUpload
                        supplierId={supplierId}
                        onSwitch={onSwitch}
                        onComplete={handleStep2Complete}
                    />
                );
            case "success":
                return <SupplierSuccessNotice onSwitch={handleBackToLogin} />;
            default:
                return (
                    <SupplierSignUpForm
                        onSwitch={onSwitch}
                        onStep1Success={handleStep1Success}
                    />
                );
        }
    };

    return (
        <div>
            {/* Progress indicator */}
            {currentStep !== "success" && (
                <div className="mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className={`flex items-center ${currentStep === "step1" ? "text-blue-400" : "text-gray-400"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === "step1" ? "border-blue-400 bg-blue-400" : "border-black/20"
                                }`}>
                                1
                            </div>
                            <span className="ml-2 text-sm text-black/35">Thông tin cơ bản</span>
                        </div>

                        <div className={`w-8 h-1 ${currentStep === "step2" ? "bg-blue-400" : "bg-gray-400"}`}></div>

                        <div className={`flex items-center ${currentStep === "step2" ? "text-blue-400" : "text-black/35"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === "step2" ? "border-blue-400 bg-blue-400" : "border-black/20"
                                   }`}>
                                2
                            </div>
                            <span className="ml-2 text-sm text-black/35">Upload giấy phép</span>
                        </div>
                    </div>
                </div>
            )}

            {renderCurrentStep()}
        </div>
    );
};

export default SupplierSignUpFlow;
