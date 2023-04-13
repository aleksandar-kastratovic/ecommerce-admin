import { useState } from "react";

import Box from "@mui/material/Box";

import PageWrapper from "../../Layout/PageWrapper/PageWrapper";
import DetailsList from "./DetailsList";

import styles from "./DetailsPage.module.scss";

/**
 * Render multiple panels.
 *
 * @param {string} title The title for the page.
 * @param {PanelSpec[]} fields The panels to render.
 * @param {boolean|[]} ready The panels to render.
 * @param {[]} additionalButtons The additional buttons for the header.
 *
 * @return {JSX.Element}
 * @constructor
 */
const DetailsPage = ({ title, fields, ready, additionalButtons = [] }) => {
  // Make sure all fields have and id and the enabled flag
  fields = (fields ?? []).map((field, index) => ({ ...field, id: field?.id ?? index, enabled: field?.enabled !== undefined ? !!field?.enabled : true }));
  const [selected, setSelected] = useState(fields[0]?.id ?? null);

  // Get the active panel
  const activePanel = fields.find((field) => field.id === selected);

  return (
    <PageWrapper title={title} back={true} actions={additionalButtons} ready={ready}>
      <Box className={styles.details}>
        {/* Panel selector */}
        <Box className={styles.list}>
          <DetailsList fields={fields} handleSelect={(field) => field.enabled && setSelected(field.id)} selected={selected} />
        </Box>

        {/* Active panel */}
        <Box className={styles.main}>{activePanel?.component ?? null}</Box>
      </Box>
    </PageWrapper>
  );
};

export default DetailsPage;
