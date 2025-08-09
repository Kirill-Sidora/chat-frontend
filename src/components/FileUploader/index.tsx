import IconButton from "@components/IconButton";
import ModalWindow from "@components/ModalWindow";
import { useFileUpload } from "@hooks/useFileUpload";
import { Fragment, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import ModalWindowContent from "@components/ImageModalWindowContent";

export interface IFileUploaderProps {
  onImageSend: (src: string) => void;
}

const FileUploader = (): ReactElement => {
  const {file, fileSrc, clear, isFileUpload, setIsFileUpload, handleUploadClick} = useFileUpload({type: "file", accept: ".jpg, .jpeg, .png", multiple: false})

  const handleSend = () => {
    if (!isFileUpload) return;
    clear();
  };

  return (
    <Fragment>
      <IconButton
          iconSrc={IconIds.PAPERCLIP_ICON}
          onClick={() => handleUploadClick()}
          height="24px"
      />

      {isFileUpload && (
        <ModalWindow>
          <ModalWindowContent file={file!} onClose={() => setIsFileUpload(false)} onSend={handleSend}/>
        </ModalWindow>
      )}
    </Fragment>
  );
};

export default FileUploader;
