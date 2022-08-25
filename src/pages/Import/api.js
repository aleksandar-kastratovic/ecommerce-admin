import axios from "axios"
import { useContext, useState } from "react"
import AuthContext from "../../store/auth-contex"

/**
 * @typedef APIResponse<T>
 *    @template T
 *    @property {number} code
 *    @property {boolean} success
 *    @property {string} message
 *    @property {T} payload
 */

/** The API helper. */
class ImportApiService {

  /** The currently logged-in user. */
  user: ?{ access_token: string }

  /** Prepare the service. */
  constructor(user) {
    this.user = user
  }

  /**
   * Send a file for import.
   *
   * @param {string} filename The name of the fila that is being imported.
   * @param {string} payload The base64 encoded contents of the file.
   *
   * @return {Promise<APIResponse>}
   */
  putProductsImport(filename, payload) {
    return this._execute("PUT", "admin/products/import", { filename, payload })
  }

  /**
   * Confirm import.
   *
   * @param {boolean} commit True to apply immediately, false to get additional preview.
   * @param {string} uuid The UUID of the import to execute, as returned from the putProductsImport().
   * @param {number} offset The number of rows to skip.
   * @param {boolean} insert Set to true to insert all products that are not found.
   * @param {{}} map The chosen map for columns.
   *
   * @return {Promise<APIResponse>}
   */
  postProductsImportExecute(commit, uuid, offset, insert, map) {
    return this._execute("POST", "admin/products/import/execute", { commit, uuid, offset, insert, map })
  }

  /**
   * Execute the API call
   *
   * @param {"LIST","GET"|"PUT"|"POST"|"DELETE"} method The HTTP method to use.
   * @param {string} path The path to the API, without the domain and API version suffix.
   * @param {?{}} payload The payload to send in the request.
   *
   * @return {Promise<APIResponse>}
   */
  _execute(method, path, payload = null) {
    return new Promise((resolve, reject) => {
      axios({
        method : method,
        url    : localStorage.getItem("api") + path.replace(/^\//, ""),
        headers: { Authorization: `Bearer ${this.user?.access_token}` },
        data   : payload
      })

        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }

}

/**
 * Get the reference to the API service.
 */
const useImportAPI = () => {
  const { user } = useContext(AuthContext)
  return useState(new ImportApiService(user))[0]
}

export default useImportAPI
