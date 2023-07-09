import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { ordersBulkApi } from "../../api/tracking";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type FileUploadProps = {
  onFileUpload: (file: File) => void;
};

function MasiveOrderForm() {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    console.log("file", file);
    if (file) {
      setFileName(file.name),
        ordersBulkApi(file).then((response) => {
          if ("success" in response && response.success) {
            setFileName(fileName + " (upload)");
          }
        });
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <input
        type="file"
        accept="image/*"
        id="file-upload-input"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <label htmlFor="file-upload-input" style={{cursor: "pointer"}}>
        <UploadFileIcon />
      </label>

      {fileName !== "" ? (
        <div style={{}}>
          <span style={{ marginLeft: "12px" }}>{fileName}</span>
        </div>
      ) : (
        <Typography sx={{ marginLeft: "12px" }}>Ingresa tu archivo</Typography>
      )}
    </div>
  );
}

export default MasiveOrderForm;
