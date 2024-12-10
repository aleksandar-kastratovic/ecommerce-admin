/**
 * Na osnovu id-a unutar objekta iz customJsonData niza, azurira se 'value' svojstvo u objektu.
 * Primer:
 * 
 * Custom napisan objekat za potrebe ispisivanja informacija dobijenih iz api response-a:
   {
        "id": "product_name",
        "type": "text",
        "label": "Proizvod",
        "value": null
    }
 *
 * API response: "product_name": "Aleksandar"   
 * 
 * ova f-ja ce azurirati 'value' svojstvo unutar objekat. Rezultat: "value": "Aleksandar"
 * 
 *
 * @param {*} customJsonData - Niz objekata dobijenih iz napisanog json fajla
 * @param {*} dataFromResponse - Objekat iz response 
 * @returns - Vraca azurirani niz objekata
 */

export const updateDataForDataViewer = (customJsonData, dataFromResponse) => {
    return customJsonData.map((object) => {
        const payloadData = dataFromResponse[object.id];

        if (!payloadData) return object;

        if (Array.isArray(payloadData)) {
            return { ...object, value: payloadData };
        }
        return { ...object, value: `${payloadData}` };
    });
};
