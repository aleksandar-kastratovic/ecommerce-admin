import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Tabs = ({ tabsData, onTabChange, removeTab, activeTabKey }) => {

    const checkTabActivation = (value) => {
        if (value !== activeTabKey) {
            onTabChange(value);
        }
    }

    const tabList = Object.keys(tabsData).map(tab =>
        <li className="nav-item" key={tabsData[tab].eventKey } style={ {order: tabsData[tab].order} }>
            <a
                className={ tabsData[tab].eventKey === activeTabKey ? 'nav-link active' : 'nav-link' }
                href=" "
                onClick={(e) => {
                    e.preventDefault()
                    checkTabActivation(tabsData[tab].eventKey)
                }}
            >
                { tabsData[tab].title }
                { tabsData[tab].eventKey > 0 && (
                    <FontAwesomeIcon 
                        icon={faTimesCircle}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeTab(tabsData[tab].eventKey)
                        }}
                    />
                )}
            </a>
        </li>
    );

    return (
        <ul className="nav nav-tabs tabs-wrapper">
            { tabList }
        </ul>
    );
}

export default Tabs;