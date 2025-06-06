import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SaveBtn from "../SaveBtn";

const API_URL = import.meta.env.VITE_API_URL;

interface FileUploadProps {
  selectedFile: File | null | string;
  setSelectedFile: (file: File | null) => void;
}

const FileUpload = ({ selectedFile, setSelectedFile }: FileUploadProps) => {
  const { formState, setValue } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const uploadCV = async (file: File | null) => {
    if (!file) return;
    if (!email) {
      toast({
        title: "Error",
        description: "Email address is required",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.patch(
        `${API_URL}onboarding-candidate/s/${email}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "CV uploaded successfully!",
          variant: "default",
          className: "bg-green-500 text-white",
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast({
        title: "Error",
        description: "Error uploading CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor="cv-upload"
        className={`font-medium text-sm ${
          formState.errors.uploadCV ? "text-red" : ""
        }`}
      >
        Upload CV <span className="text-red">*</span>
      </label>
      <div className="flex items-center relative w-full">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setSelectedFile(file);
            setValue("uploadCV", file?.name);
            uploadCV(file);
          }}
          className="hidden"
          id="cv-upload"
          accept=".pdf"
        />
        <label
          htmlFor="cv-upload"
          className="inline-flex w-full font-semibold text-[14px] items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          {selectedFile
            ? typeof selectedFile === "string"
              ? selectedFile
              : selectedFile.name
            : "Upload CV"}
        </label>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-md">
            <SaveBtn text="" />
          </div>
        )}
      </div>
      {formState.errors.uploadCV &&
      typeof formState.errors.uploadCV.message === "string" ? (
        <p className="text-sm text-red">{formState.errors.uploadCV.message}</p>
      ) : (
        ""
      )}
      <div className="flex items-center">
        <span className="text-red animate-bounce">
          Make sure <span className="font-bold">CV</span> is uploaded
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
