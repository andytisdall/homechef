import './FileInput.css';

const FileInput = ({
  file,
  setFile,
  label,
}: {
  file: 
  setFile: React.Dispatch<React.SetStateAction<null>>;
  label: string;
}) => {
  const processFile = e => {
    const {files} = e.target;
    if (files[0]) {
      setFile(files[0]);
    }
  };

  const displayName = () => {
    return file.name.slice(0, 15) + '...';
  };

  return (
    <>
      <label htmlFor={label} className="file-label">
        {label}
      </label>
      <div className="file-input-container">
        <label htmlFor={label} className="file-input">
          choose file
        </label>
        {file ? (
          <>
            <div className="file-name">{displayName()}</div>
            <div onClick={() => setFile(null)} className="file-delete">
              x
            </div>
          </>
        ) : null}
      </div>
      <input
        type="file"
        name={data}
        id={label}
        className="file-hidden"
        onChange={processFile}
      />
    </>
  );
};

export default FileInput;
