const DatailsTabs = ({ tabsData, onTabChange, activeTabKey }) => {
    const checkTabActivation = (value) => {
        if (value !== activeTabKey) {
            onTabChange(value);
        }
    };

    const tabList = Object.keys(tabsData).map((tab) => (
        <button
            className={tabsData[tab].eventKey === activeTabKey ? "datails-tab-item active" : "datails-tab-item"}
            onClick={(e) => {
                e.preventDefault();
                checkTabActivation(tabsData[tab].eventKey);
            }}
            key={tabsData[tab].eventKey}
            style={{ order: tabsData[tab].order }}
        >
            <div>{tabsData[tab].title}</div>
        </button>
    ));

    return <ul className="datails-tab-container row">{tabList}</ul>;
};

export default DatailsTabs;
