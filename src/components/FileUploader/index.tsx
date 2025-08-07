import IconButton from "@components/IconButton";
import FilePreviewModal from "@components/FilePreviewModal";
import { useFileUpload } from "@hooks/useFileUpload";
import { Fragment, type ReactElement } from "react";
import { IconIds } from "@utils/constants";

export interface IFileUploaderProps {
  onImageSend: (src: string) => void;
}

const FileUploader = (): ReactElement => {
  const {file, fileSrc, isModalOpen, setIsModalOpen, handleUploadClick} = useFileUpload({fileInput: document.createElement("input"), type: "file", accept: ".jpg, .jpeg, .png", multiple: false})

  const handleSend = () => {
    if (!file || !fileSrc) return;

    console.log("Отправка файла:", file.name);

    setIsModalOpen(false);
  };

  const isFileUploadReady = isModalOpen && file && fileSrc;

  return (
    <Fragment>
      <IconButton
          iconSrc={IconIds.PAPERCLIP_ICON}
          onClick={() => handleUploadClick()}
          height="24px"
      />

      {isFileUploadReady &&(
        <FilePreviewModal
          file={file}
          onClose={() => setIsModalOpen(false)}
          onSend={handleSend}
        />
      )}
    </Fragment>
  );
};

export default FileUploader;
