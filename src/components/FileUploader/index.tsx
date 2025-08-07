import IconButton from "@components/IconButton";
import ModalWindow from "@components/ModalWindow";
import { useFileUpload } from "@hooks/useFileUpload";
import { Fragment, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import ModalWindowContent from "@components/ModalWindowContent";

export interface IFileUploaderProps {
  onImageSend: (src: string) => void;
}

const FileUploader = (): ReactElement => {
  const {file, setFile, fileSrc, setFileSrc, fileUpload, setFileUpload, handleUploadClick} = useFileUpload({type: "file", accept: ".jpg, .jpeg, .png", multiple: false})

  const handleSend = () => {
    if (!fileUpload) return;
    
    setFile(null);
    setFileSrc(null);
    setFileUpload(false);
  };

  return (
    <Fragment>
      <IconButton
          iconSrc={IconIds.PAPERCLIP_ICON}
          onClick={() => handleUploadClick()}
          height="24px"
      />

      {fileUpload && (
        <ModalWindow>
          <ModalWindowContent file={file!} onClose={() => setFileUpload(false)} onSend={handleSend}/>
        </ModalWindow>
      )}
    </Fragment>
  );
};

export default FileUploader;
