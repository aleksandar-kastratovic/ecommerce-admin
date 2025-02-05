import React, { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import useAPI from "../../../api/api";
import { useQuery } from "react-query";

const Swagger = () => {
  const [yamlFiles, setYamlFiles] = useState([]);
  const api = useAPI();

  // Fetch Swagger YAML files
  const { data: ddlYamlFiles, error, isLoading } = useQuery(
    "systemDocumentationSwaggerFiles",
    async () => {
      return await api.get("admin/system-documentation/swagger/ddl/files")
        .then((res) => res?.payload ?? [])
        .catch((error) => {
          console.error(error);
          return [];
        });
    },
    { refetchOnWindowFocus: false } // Prevent refetching on window focus
  );

  // Update state when `ddlYamlFiles` changes
  useEffect(() => {
    if (ddlYamlFiles) {
      let base_api = localStorage.getItem("api") + ("admin/system-documentation/swagger/file/").replace(/^\//, "");
      ddlYamlFiles.map( ( item ) => {

        if(!item.url.startsWith(base_api)) {
          item.url = base_api + item.url;
        }
        return item;
      });
      
      setYamlFiles(ddlYamlFiles);
    }
  }, [ddlYamlFiles]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Swagger documentation</p>;

  return (
    <SwaggerUI
      url={yamlFiles.length > 0 ? yamlFiles[0].url : ""}
      urls={yamlFiles}  
      supportedSubmitMethods={[
        "get",
        "post",
        "put",
        "delete",
        "patch",
        "options",
        "head",
        "trace",
        "list",
        "fetch"
      ]}
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
                    console.log("Operations:", operations); // Inspect operations
                    // You can filter or modify operations here
                    return operations;
                  },
                },
              },
            },
          };
        },
      ]}
      
      docExpansion="none"
      deepLinking={true}
      persistAuthorization={true}
      displayRequestDuration={true}
    />
  );
};

export default Swagger;
