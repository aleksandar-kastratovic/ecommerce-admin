import tblFields from "../Codes/tblFields.json";
import { useState, useEffect } from "react";
import ListPage from "../../../../../components/shared/ListPage/ListPage";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import useAPI from "../../../../../api/api";

const CodesList = () => {
    const api = useAPI();
    const [formFields, setFormFields] = useState(tblFields);
    const { pid } = useParams();

    const customActions = {
        edit: {
            display: false,
        },
    };

    const [downloadLink, setDownloadLink] = useState(null);
    const params = new URLSearchParams(window.location.search);
    const system = params.get("system");

    //POST za export kodova
    const { mutate: exportData, isLoading } = useMutation(
        ["export-promo-kodovi"],
        async () => {
            return await api
                .post("admin/campaigns/promo-codes/export", {
                    id_campaign: pid,
                    system: system,
                })
                .then((res) => {
                    toast.success(`Uspešno pokrenut export promo kodova!`);
                    return res?.payload;
                })
                .catch((err) => {
                    toast.error(`Došlo je do greške prilikom exporta promo kodova!`);
                    console.log(err);
                });
        },
        {}
    );

    //GET za download e-ponude
    const getFile = useQuery(
        ["export-promo kodova-download"],
        async () => {
            return await api
                .get(`admin/campaigns/promo-codes/export/${pid}`)
                .then((res) => {
                    setDownloadLink(res?.payload);
                })
                ?.catch((err) => console.log(err));
        },
        { refetchOnWindowFocus: false, enabled: false }
    );

    const buttons = [
        {
            position: 1,
            action: () => {
                getFile.refetch();
            },
            icon: "download",
            disabled: getFile.isFetching || isLoading,
            title: "Preuzmi fajl",
            label: `${getFile.isFetching ? `Preuzimanje u toku...` : "Preuzmi fajl"}`,
        },
        {
            position: 2,
            action: () => {
                exportData();
            },
            disabled: isLoading || getFile.isFetching,
            icon: "upload",
            title: "Export promo kodova",
            label: `${isLoading ? `Export u toku...` : "Export promo kodova"}`,
        },
    ];

    //download fajla: appendujemo a tag u DOM, pa ga kliknemo, a onda ga uklonimo
    useEffect(() => {
        if (downloadLink) {
            const a = document.createElement("a");
            a.href = downloadLink?.file_base64;
            a.download = downloadLink?.file_name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setDownloadLink(null);
        }
    }, [downloadLink]);

    return (
        <ListPage
            title={` `}
            apiUrl={`admin/campaigns/promo-codes/codes/${pid}`}
            deleteUrl={`admin/campaigns/promo-codes/codes`}
            columnFields={formFields}
            showNewButton={true}
            additionalButtons={buttons}
            customActions={customActions}
        />
    );
};

export default CodesList;
