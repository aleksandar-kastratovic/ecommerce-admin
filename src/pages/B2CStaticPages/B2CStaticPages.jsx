import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

import Modal from "../../components/shared/Modal/Modal";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/shared/Button/Button";
import AuthContext from "../../store/auth-contex";

const B2CStaticPages = () => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [openModal, setOpenModal] = useState({ show: false, id: null, name: "" });
    const [doesRefetch, setDoesRefetch] = useState(false);

    const customActions = {
        contentCopy: {
            type: "custom",
            display: true,
            position: 3,
            clickHandler: {
                type: "",
                fnc: (data) => {
                    setOpenModal({ show: true, id: data.id, name: data.name });
                },
            },
            icon: "content_copy",
            title: "Dupliraj",
        },
    };

    const copyHandler = async () => {
        try {
            let res = await api.post("admin/static-pages-b2c/basic-data/clone", { id: openModal.id });
            setDoesRefetch(true);
            console.log(res);
        } catch (error) {
            console.warn(error);
        }

        setOpenModal({ show: false, id: null, name: "" });
    };

    useEffect(() => {
        if (doesRefetch) {
            setDoesRefetch(false);
        }
    }, [doesRefetch]);

    return (
        <>
            <ListPage
                listPageId="B2CStaticPages"
                apiUrl="admin/static-pages-b2c/list"
                title="Statičke stranice"
                columnFields={tblFields}
                customActions={customActions}
                doesRefetch={doesRefetch}
                setDoesRefetch={setDoesRefetch}
            />
            <Modal
                title={"Dupliranje stranice"}
                open={openModal.show}
                closeModal={() => {
                    setOpenModal({ show: false, id: null, name: null });
                }}
                content={<p>{`Da li ste sigurni da zelite da duplirate stranicu ${openModal.name}`}</p>}
                modalFooterButton={
                    <div>
                        <Button label="Da" variant="contained" onClick={copyHandler} />
                        <Button label="Ne" variant="contained" onClick={() => setOpenModal({ show: false, id: null, name: null })} />
                    </div>
                }
            />
        </>
    );
};

export default B2CStaticPages;
