import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

const FileListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const FileName = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 14px;
  color: #333;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c0392b;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
`;

interface FileDropProps {
  file: { name: string } | undefined;
  setFile: any;
}

const parseFileAsync = (file: File) => {
  return new Promise<any>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        for (let teste of results.data) {
          teste['rollWidth'] = parseInt(teste['rollWidth']);
          teste['quantity'] = parseInt(teste['quantity']);
        }
        resolve(results.data);
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
};

const FileDrop = (props: FileDropProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const fileInputRef = useRef<any>(null);
  const [fileName, setFileName] = useState(null);

  const handleRemoveFile = () => {
    props.setFile(null);
  };

  const handleFileInputChange = async (event: any) => {
    const files = event.target.files;

    const file = files[0];
    if (file && file.type === 'text/csv') {
      setErrorMessage(null);

      try {
        const parsedData = await parseFileAsync(file);
        setFileName(file.name);
        props.setFile(parsedData);
      } catch (error) {
        setErrorMessage('Erro ao processar o arquivo.');
      }
    }

    // Limpar o valor do input para permitir que o usuário selecione o mesmo arquivo novamente, se desejar
    event.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <div
        style={{
          margin: '1rem 0',
          border: '2px dashed #3498db',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: '#f7f7f7',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease-in-out',
        }}
        onClick={handleClick}
      >
        <p>Clique para selecionar o arquivo .csv com as demandas</p>
      </div>
    </>
  );
};

export default FileDrop;
