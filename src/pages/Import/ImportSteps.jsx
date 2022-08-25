import { useState } from "react"
import PageWrapper from "../../components/shared/Layout/PageWrapper/PageWrapper"
import useFileInput from "../../hooks/useFileInput"
import ImportStep1 from "./ImportStep1"
import ImportStep2 from "./ImportStep2"

/**
 * Show the import wizard.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ImportSteps = () => {

  // Capture the file and go to the next step
  const [ file: ?{ name: string, base64: string }, setFile ] = useState(null)
  const input = useFileInput((name, base64) => setFile({ name, base64 }))

  // Get the proper step
  const currentStep = () => {
    switch (true) {
      case !file:
        return <ImportStep1 fileInputRef={input} />
      case true:
        return <ImportStep2 filename={file.name} payload={file.base64} />
    }
  }

  return (
    <PageWrapper title="Uvoz podataka iz fajla" back={file ? () => setFile(null) : null}>
      {currentStep()}
    </PageWrapper>
  )
}

export default ImportSteps
