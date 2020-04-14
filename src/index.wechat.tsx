import React, { useState } from 'react';
import { View, getSystemInfoSync, usePageScroll } from 'remax/wechat';

import propTypes from 'prop-types';
import styles from './index.less';
import transformRpx from './transformRpx';

const PAGE_DISTANCE = 667;

const WaterfallPlus = (props) => {
  // 页面显示区域卡尺
  function usePageCaliper() {
    const { windowHeight } = getSystemInfoSync();
    const [caliper, setCaliper] = useState([
      0 - PAGE_DISTANCE,
      windowHeight + PAGE_DISTANCE,
    ]); // 显示几个
    return [caliper, setCaliper];
  }
  const [pageCaliper, setPageCaliper] = usePageCaliper();

  function getDataGroups() {
    const { dataSource = [], columns = 2 } = props;
    const heightGroups: number[] = [];
    const dataGroups: Array<any[]> = [];
    const topOffsetGroup: number[] = [];
    const bottomOffsetGroup: number[] = [];

    for (let index = 0; index < columns; index++) {
      heightGroups.push(0);
      topOffsetGroup.push(0);
      bottomOffsetGroup.push(0);
      dataGroups.push([]);
    }

    dataSource.forEach((item, index) => {
      let minHeight = Math.min.apply(Math, heightGroups);
      let targetGroupIndex = Math.max(heightGroups.indexOf(minHeight), 0);

      const dataGroup = dataGroups[targetGroupIndex];

      if (Number.isInteger(item.height)) {
        heightGroups[targetGroupIndex] += item.height;
        // 上一个元素的下标值
        const prevItemEndThreshold = dataGroup[dataGroup.length - 1]
          ? dataGroup[dataGroup.length - 1]._endThreshold
          : 0;

        item._startThreshold = prevItemEndThreshold;
        item._endThreshold = prevItemEndThreshold + transformRpx(item.height);
        if (item._endThreshold < pageCaliper[0]) {
          // 在屏幕上方
          item._visible = false;
          topOffsetGroup[targetGroupIndex] += item.height;
        } else if (item._startThreshold > pageCaliper[1]) {
          // 在屏幕下方
          item._visible = false;
          bottomOffsetGroup[targetGroupIndex] += item.height;
        } else {
          item._visible = true;
        }
        dataGroup.push(item);
      } else {
        console.warn('waterfall 组件接受的数据, 必须含 height 字段!');
      }
    });
    return { dataGroups, topOffsetGroup, bottomOffsetGroup };
  }

  const { renderItem, scrollOffest } = props;
  const { windowHeight } = getSystemInfoSync(); // 页面高度
  usePageScroll((res) => {
    const { scrollTop } = res;
    const scrollTopPx = scrollTop; // 单位 PX
    const waterfallScrollTop = Math.max(scrollTopPx - scrollOffest, 0);
    // 得到页面展现区间值
    setPageCaliper([
      waterfallScrollTop - PAGE_DISTANCE,
      waterfallScrollTop + windowHeight + PAGE_DISTANCE,
    ]);
  });

  const { dataGroups, topOffsetGroup, bottomOffsetGroup } = getDataGroups();

  return (
    <View className={styles.waterfall} style={props.style}>
      {dataGroups.map((dataGroup, g) => {
        return (
          <View key={g} className={styles.column}>
            <View
              style={{ height: topOffsetGroup[g] }}
              className={styles.placeholder}
            />
            {dataGroup.map((item, i) => {
              if (item._visible == false) return null;
              return (
                <View
                  key={`g_${g}_${i}`}
                  className="waterfall-item"
                  style={{ height: item.height }}
                  data-group={g}
                  data-index={i}
                  data-s={item._startThreshold}
                  data-e={item._endThreshold}
                >
                  {renderItem(item, `g_${g}_${i}`)}
                </View>
              );
            })}
            <View
              style={{ height: bottomOffsetGroup[g] }}
              className={styles.placeholder}
            />
          </View>
        );
      })}
    </View>
  );
};

WaterfallPlus.propTypes = {
  renderItem: propTypes.func, // 渲染子元素
  columns: propTypes.number, // 共有几列
  dataSource: propTypes.array, // 数据源
  scrollOffest: propTypes.number, // 页面滚动偏移量
  style: propTypes.object, // 根节点样式
};

WaterfallPlus.defaultProps = {
  renderItem: () => {},
  columns: 2,
  scrollOffest: 0,
  dataSource: [],
};

export default WaterfallPlus;
