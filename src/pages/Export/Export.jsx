import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import { useQuery } from "react-query";
import useAPI from "../../api/api";
import { useEffect, useState } from "react";

const Export = () => {
    const api = useAPI();
    const [fileId, setFileId] = useState(null); //id fajla koji se skida [downloadFile]
    const [file, setFile] = useState(null);
    const downloadFile = useQuery(
        ["downloadFile", fileId],
        async () => {
            return await api.get(`admin/export/list/${fileId}`).then((res) => {
                setFile(res?.payload);
                setFileId(null);
            });
        },
        { refetchOnWindowFocus: false, enabled: false }
    );

    const customActions = {
        delete: {
            type: "delete",
            display: false,
        },
        edit: {
            type: "edit",
            display: false,
        },
        download: {
            type: "custom",
            display: true,
            position: 2,
            icon: "download",
            title: "Preuzmite dokument",
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    setFileId(rowData?.id_file);
                },
            },
        },
    };

    useEffect(() => {
        if (fileId) {
            downloadFile.refetch();
        }
    }, [fileId]);

    useEffect(() => {
        if (file) {
            const a = document.createElement("a");
            a.href = file?.file_base64;
            a.download = file?.file_name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setFile(null);
        }
    }, [file]);

    return <ListPage listPageId="Export" apiUrl="admin/export/list" title="Izvoz podataka iz fajla" columnFields={tblFields} customActions={customActions} />;
};

export default Export;
