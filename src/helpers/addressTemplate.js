const addressTemplate = (address, object_number, floor, apartmentNumber) => {
    return `${address ?? ""} ${object_number ?? ""} ${floor ?? ""} ${apartmentNumber ?? ""}`;
};

export default addressTemplate;
