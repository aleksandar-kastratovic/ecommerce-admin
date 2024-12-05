import { useQuery } from "react-query";
import { useContext } from "react";
import AuthContext from "../../../store/auth-contex";

export const useSingleMarkData = (apiURL, reviewID) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const { data, isLoading, error } = useQuery(
        [apiURL, reviewID],
        () => {
            return api
                .get(apiURL)
                .then((response) => response?.payload)
                .catch((error) => {
                    throw error;
                });
        },
        {
            enabled: !!reviewID,
        }
    );

    return { data, isLoading, error };
};
