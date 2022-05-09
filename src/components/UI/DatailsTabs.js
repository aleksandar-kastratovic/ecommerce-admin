import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const DatailsTabs = ({ tabsData, onTabChange, activeTabKey }) => {

    const checkTabActivation = (value) => {
        if (value !== activeTabKey) {
            onTabChange(value);
        }
    }

    const tabList = Object.keys(tabsData).map(tab =>
        <button
            className={ tabsData[tab].eventKey === activeTabKey ? 'datails-tab-item active' : 'datails-tab-item' }
            onClick={(e) => {
                e.preventDefault()
                checkTabActivation(tabsData[tab].eventKey)
            }}
            key={tabsData[tab].eventKey }
            style={ {order: tabsData[tab].order} }
        >
            <div>
                <FontAwesomeIcon className="me-1" icon={tabsData[tab].icon} />
                { tabsData[tab].title }
            </div>
            <FontAwesomeIcon  className="ms-1" icon={faArrowAltCircleRight}/>
        </button>
    );

    return (
        <ul className="datails-tab-container row">
            { tabList }
        </ul>
    );
}

export default DatailsTabs;