import React, { useState, useEffect } from 'react';
import './style.less';

const Tabs = (props) => {
  const { 
    activeTab = 0, 
    animated = true, 
    page = 5, 
    containerStyle = {},
    tabBarUnderlineStyle = {},
    tabBarBackgroundColor = '#fff',
    tabBarActiveTextColor = '#333',
    tabBarInactiveTextColor = '#333',
    tabBarTextStyle = {},
  } = props;
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const count = React.Children.count(props.children);
  const width = 100 / Math.min(count, page);
  const center = page / 2;

  useEffect(() => {
    React.Children.map(props.children, (element, index) => {
      if (element.props.tab === currentTab) {
        setCurrentIndex(index);
        getTranslateX(index);
      }
    });
  }, []);

  const handleClick = (tab, index) => {
    setCurrentTab(tab);
    setCurrentIndex(index);
    getTranslateX(index);
  } 

  const getTranslateX = (currentIndex) => {
    const pos = Math.min(currentIndex, count - center - 0.5);
    const translateX = Math.min(-(pos - center + 0.5) * width, 0);
    setTranslateX(translateX);
  }

  const renderHeader = () => {
    return React.Children.map(props.children, (element, index) => {
      const styles = {
        ...tabBarTextStyle,
        width: `${width}%`,
        color: element.props.tab === currentTab ? tabBarActiveTextColor : tabBarInactiveTextColor,
      }
      return (
        <span
          key={element.props.tab}
          className={`item ${element.props.tab === currentTab ? 'active' : ''}`}
          style={styles}
          onClick={() => handleClick(element.props.tab, index)}
        >
          {element.props.name}
        </span>
      )}
    );
  }

  const renderContent = () => {
    return React.Children.map(props.children, (element) => (
      <div
        key={element.props.tab}
        className="item"
      >
        {element.props.children}
      </div>
    ));
  }

  return (
    <div className="tabbar-component" style={containerStyle}>
      <div className="tabbar-component-header" style={{backgroundColor: tabBarBackgroundColor}}>
        <div className={`scroll-tabbar ${animated ? 'animated' : ''}`} style={{transform: `translateX(${translateX}%)`}}>
          {renderHeader()}
          <div className={`underline-container ${animated ? 'animated' : ''}`} style={{width: `${width}%`, transform: `translateX(${currentIndex * 100}%)`}}>
            <span className="underline" style={tabBarUnderlineStyle}/>
          </div>
        </div>
      </div>
      <div 
        className={`tabbar-component-content ${animated ? 'animated' : ''}`}
        style={{transform: `translateX(-${currentIndex * 100}%)`}}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default Tabs;