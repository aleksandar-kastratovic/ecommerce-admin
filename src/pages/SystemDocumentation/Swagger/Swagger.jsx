import React, { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import useAPI from "../../../api/api";
import { useQuery } from "react-query";
import { Select, MenuItem } from "@mui/material";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import "./Swagger.scss";

const Swagger = () => {
    const [selectedSpec, setSelectedSpec] = useState("");
    const api = useAPI();

    // Fetch Swagger YAML files
    const {
        data: ddlYamlFiles,
        error,
        isLoading,
    } = useQuery(
        "systemDocumentationSwaggerFiles",
        async () => {
            return await api
                .get("admin/system-documentation/swagger/ddl/files")
                .then((res) => {
                    let base_api = localStorage.getItem("api") + "admin/system-documentation/swagger/file/".replace(/^\//, "");
                    if (res?.payload?.[0]?.url) {
                        setSelectedSpec(base_api + res?.payload?.[0]?.url);

                        const updatedRes = res.payload.map((item) => {
                            if (!item.url.startsWith(base_api)) {
                                item.url = base_api + item.url;
                            }
                            return item;
                        });

                        return updatedRes;
                    } else return [];
                })
                .catch((error) => {
                    console.error(error);
                    return [];
                });
        },
        { refetchOnWindowFocus: false }
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading Swagger documentation</p>;

    return (
        <PageWrapper title={"API Specification"}>
            <Select
                onChange={(e) => setSelectedSpec(e.target.value)}
                value={selectedSpec}
                sx={{
                    width: "100%",
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                    "& .MuiSelect-select": { padding: "0.7rem", fontSize: "0.875rem" },
                }}
            >
                {ddlYamlFiles.length > 0 &&
                    ddlYamlFiles?.map((file, index) => (
                        <MenuItem key={index} value={file.url}>
                            {file.name}
                        </MenuItem>
                    ))}
            </Select>

            <SwaggerUI
                url={selectedSpec}
                supportedSubmitMethods={["get", "post", "put", "delete", "patch", "options", "head", "trace", "list", "fetch"]}
                requestInterceptor={(request) => {
                    request.headers["Authorization"] = `Bearer ${api.user?.access_token}`;
                    return request;
                }}
                plugins={[
                    function () {
                        return {
                            statePlugins: {
                                spec: {
                                    wrapSelectors: {
                                        operations: (origSelector) => (state) => {
                                            const operations = origSelector(state); // Get the list of operations
                                            // You can filter or modify operations here
                                            return operations;
                                        },
                                    },
                                },
                            },
                        };
                    },
                ]}
                deepLinking={true}
                persistAuthorization={true}
                displayRequestDuration={true}
            />
        </PageWrapper>
    );
};

export default Swagger;
